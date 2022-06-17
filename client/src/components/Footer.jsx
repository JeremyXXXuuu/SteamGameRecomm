
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/JeremyXXXuuu">
          github
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          DS50
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Steam Game Recommendation
        </Typography>
        <Copyright />
      </Box>
  )
}

export default Footer