# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

from bitarray import test
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances
import sys
import json
import io
# Faire des prédictions sur la base de ces similitudes
import pymongo
from bson.objectid import ObjectId


def load_from_mongo_local():
    # client = pymongo.MongoClient(
    #     "mongodb+srv://jeremy:root@cluster0.5ei45.mongodb.net/test")
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client.database_DS50
    collection = db['userrecomms']
    df = pd.DataFrame(list(collection.find()))
    return df


def load_from_mongo():
    client = pymongo.MongoClient(
        "mongodb+srv://jeremy:root@cluster0.5ei45.mongodb.net/test")
    db = client.database
    collection = db['steam_user']
    df = pd.DataFrame(list(collection.find()))
    del df['_id']
    return df


# Faire des prédictions sur la base de ces similitudes
def predict(ratings, similarity, type='user'):
    if type == 'user':
        mean_user_rating = ratings.mean(axis=1)
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(
            ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / \
            np.array([np.abs(similarity).sum(axis=1)])
    return pred

# Trouvez la différence entre les jeux joués pour l'objectif et l'utilisateur référé
# Pour éviter de recommander pour objectif avec des jeux qui ont déjà été joués


# Trouvez la différence entre les jeux joués pour l'objectif et l'utilisateur référé
# Pour éviter de recommander pour objectif avec des jeux qui ont déjà été joués
def find_diff(userid1, userid2):
    game1 = clean_data[clean_data["userid"] == userid1]["gameIdx"].tolist()
    game2 = clean_data[clean_data["userid"] == userid2]["gameIdx"].tolist()
    diff = set(game2).difference(set(game1))
    return diff


# Trier les jeux en fonction de leur scores et recommander les meilleurs.
def sort_game(game_diff, useridx, similar_indices, num):
    if len(game_diff) < num:
        num = len(game_diff)
    game_rating = [None]*len(game_diff)
    for i in range(len(game_diff)):
        game_rating[i] = user_game_interactions[similar_indices[0]][list(game_diff)[
            i]]
    game_rating = np.array(game_rating)
    sort = game_rating.argsort()[::-1]
    recomand_game = [0]*num
    for i in range(num):
        #        print(idx2game[list(game_diff)[sort[i]]])
        #        print(clean_data.loc[clean_data['gameIdx']==list(game_diff)[sort[i]]]['appid'].tolist()[0])
        recomand_game[i] = clean_data.loc[clean_data['gameIdx']
                                          == list(game_diff)[sort[i]]]['appid'].tolist()[0]
    return recomand_game

# suppression des doublons


def del_dup(items):
    s = set()
    for item in items:
        if item not in s:
            yield item
            s.add(item)
# Convertir l'identifiant de l'utilisateur en index
# Trouver l'utilisateurs le plus similaire
# Utiliser sort_game pour faire la recommandation


# Convertir l'identifiant de l'utilisateur en index
# Trouver l'utilisateurs le plus similaire
# Utiliser sort_game pour faire la recommandation
def recommendation(userid, prediction, num):
    total = num
    idx = user2idx[userid]
    similar_indices = user_prediction[idx].argsort()[::-1]
    userid2 = idx2user[similar_indices[0]]
    game_diff = find_diff(userid, userid2)
    # Si l'utilisateur le plus similaire a moins de "num" jeux différents de ceux de l'objectif
    # Trouver un deuxième utilisateur similaire
    if len(game_diff) >= num:
        recommended = sort_game(
            game_diff, similar_indices[0], similar_indices, num)
        num = 0
    else:
        i = 0
        # Trouvez jusqu'à trois utilisateurs similaires à recommander
        recommended = []  # Jeux déjà recommandés
        while num > 0 & i < 3:
            userid2 = idx2user[similar_indices[i]]
            game_diff = find_diff(userid, userid2)
            num_rec = num-len(game_diff)
            if len(game_diff) != 0:
                recomand_game = sort_game(
                    game_diff, similar_indices[i], similar_indices, num)
                for i in range(len(recomand_game)):
                    recommended.append(recomand_game[i])
            num = num_rec
            i = i+1

    # suppression des doublons
    recommended = list(del_dup(recommended))

    # Si le nombre de jeux qui peuvent être recommandés par des utilisateurs similaires est
    # inférieur au nombre de jeux qui doivent être recommandés, les jeux les plus vendus seront recommandés.
    # Ne recommandez pas les jeux qui ont déjà été recommandés.
    if num > 0:
        if len(recommended) != 0:
            for j in range(len(recommended)):
                for i in range(len(topgames)):
                    if recommended[j] == topgames[i][0]:
                        del topgames[i]
        for k in range(num):
            recommended.append(topgames[k])
    # Affiche l'identifiant du jeu recommandé
    for x in recommended:
        print(x, end=' ')

# steam_data = pd.read_csv('./steam_200k_last.csv')

# steam_data.isnull().values.any()
# steam_data['Hours_Played'] = steam_data['hoursplayed'].astype('float32')

# steam_data['Hours_Played'] = steam_data['hoursplayed'].astype('float32')
# steam_data.loc[(steam_data['behavior'] == 'purchase') & (
#     steam_data['hoursplayed'] == 1.0), 'Hours_Played'] = 0

# clean_data = steam_data.drop(['behavior', 'hoursplayed'], axis=1)
# # Nombre d'utilisateurs après le traitement

# # Ajouter une colonne pour indiquer les scores des utilisateurs
# clean_data['rating'] = clean_data['Hours_Played']

# # Les scores sont basés sur la durée du jeu de l'utilisateur.
# for i in range(len(clean_data)):
#     # Par example, plus de 76 heures de jeu, le score est 5 sur 5.
#     if clean_data.iloc[i, 3] > 24:
#         clean_data.iloc[i, 4] = 5
#     elif 7 < clean_data.iloc[i, 3] <= 24:
#         clean_data.iloc[i, 4] = 4
#     elif 2 < clean_data.iloc[i, 3] <= 7:
#         clean_data.iloc[i, 4] = 3
#     elif 0 < clean_data.iloc[i, 3] <= 2:
#         clean_data.iloc[i, 4] = 2
#     else:
#         clean_data.iloc[i, 4] = 1


clean_data = load_from_mongo_local()
# clean_data = pd.read_csv('./clean_data.csv')
# Nombre d'utilisateurs après le traitement
n_users = len(clean_data.userid.unique())
n_games = len(clean_data.appid.unique())  # Nombre de jeux

# Créer les dictionnaires pour convertir l'utilisateur et les jeux en index et inversement
user2idx = {user: i for i, user in enumerate(clean_data.userid.unique())}
idx2user = {i: user for user, i in user2idx.items()}

game2idx = {game: i for i, game in enumerate(clean_data.appid.unique())}
idx2game = {i: game for game, i in game2idx.items()}
# convertir l'utilisateur et les jeux en index
user_idx = clean_data['userid'].apply(lambda x: user2idx[x]).values
game_idx = clean_data['gameIdx'] = clean_data['appid'].apply(
    lambda x: game2idx[x]).values
rating = clean_data['rating'].values

topgames = [0]*10

topgames[0] = [570, "Dota 2"]
topgames[1] = [440, "Team Fortress 2"]
topgames[2] = [304930, "Unturned"]
topgames[3] = [550, "Left 4 Dead 2"]
topgames[4] = [240, "Counter-Strike Source"]
topgames[5] = [10, "Counter-Strike"]
topgames[6] = [4000, "Garry's Mod"]
topgames[7] = [8930, "Sid Meier's Civilization V"]
topgames[8] = [301520, "Robocraft"]
topgames[9] = [320, "Half-Life 2 Deathmatch"]

# Créer les dictionnaires pour convertir l'utilisateur et les jeux en index et inversement
user2idx = {user: i for i, user in enumerate(clean_data.userid.unique())}
idx2user = {i: user for user, i in user2idx.items()}

game2idx = {game: i for i, game in enumerate(clean_data.appid.unique())}
idx2game = {i: game for game, i in game2idx.items()}

# convertir l'utilisateur et les jeux en index
user_idx = clean_data['userid'].apply(lambda x: user2idx[x]).values
game_idx = clean_data['gameIdx'] = clean_data['appid'].apply(
    lambda x: game2idx[x]).values
rating = clean_data['rating'].values


# Créer une matrice zéro
zero_matrix = np.zeros(shape=(n_users, n_games))
user_game_interactions = zero_matrix.copy()
# Remplir la matrice avec des scores
user_game_interactions[user_idx, game_idx] = rating


user_similarity = pairwise_distances(user_game_interactions, metric='cosine')
item_similarity = pairwise_distances(user_game_interactions.T, metric='cosine')
user_prediction = predict(user_game_interactions, user_similarity, type='user')
user_id = sys.argv[1]

output = str(recommendation(user_id, user_prediction, 20))
# sys.stdout.write(output)
sys.stdout.flush()
# test1_user_id = ObjectId('62a234773ada76d620997337')
# test2_user_id = ObjectId('62a240613ada76d6209975fb')
# recommendation(303007171, user_prediction, 20)
