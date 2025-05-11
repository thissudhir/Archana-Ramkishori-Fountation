"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  TextField,
  Button,
  Divider,
  Link,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Footer() {
  const theme = useTheme();
  const socials = [
    { icon: <Facebook />, link: "https://www.facebook.com/official.arkwf" },
    { icon: <Instagram />, link: "https://www.instagram.com/official_arkwf/" },
    { icon: <LinkedIn />, link: "https://www.linkedin.com/company/thearkwf/" },
  ];

  const quickLinks = [
    { text: "About Us", href: "/about-us" },
    { text: "Our Projects", href: "/projects" },
    { text: "Get Involved", href: "/volunteer" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        pt: 8,
        pb: 4,
        mt: 8,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
        },
      }}
    >
      {/* Background decorative elements */}
      <Box
        component={motion.div}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        sx={{
          position: "absolute",
          bottom: -150,
          right: -150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          opacity: 0.3,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Organization Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                Archana RamKishori Welfare Foundation
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Making a difference in communities through sustainable
                development and empowerment initiatives.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socials.map((social, index) => (
                  <IconButton
                    key={index}
                    component={motion.button}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                      "&:hover": {
                        color: theme.palette.secondary.main,
                        borderColor: theme.palette.secondary.main,
                      },
                    }}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    underline="none"
                    color="inherit"
                    component={motion.a}
                    whileHover={{
                      x: 5,
                      color: theme.palette.secondary.main,
                    }}
                    sx={{
                      display: "block",
                      opacity: 0.8,
                      fontSize: "0.9rem",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Stack spacing={2}>
                <Box
                  component={motion.div}
                  whileHover={{ x: 3 }}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                >
                  <LocationOn
                    fontSize="small"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    C/o Sri Ram Nararyan, Church Road, Pahalwara, Balrampur,
                    Uttar Pradesh, India, 271201.
                  </Typography>
                </Box>
                <Box
                  component={motion.div}
                  whileHover={{ x: 3 }}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Email
                    fontSize="small"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    arkwf.org@gmail.com
                  </Typography>
                </Box>
                <Box
                  component={motion.div}
                  whileHover={{ x: 3 }}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Phone
                    fontSize="small"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    +91 8563856382
                  </Typography>
                </Box>
              </Stack>
            </motion.div>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Subscribe to our newsletter for updates and news.
              </Typography>
              <Stack spacing={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Your email"
                  fullWidth
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255,255,255,0.5)",
                    },
                  }}
                  InputProps={{
                    sx: {
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.5)",
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  component={motion.button}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    borderRadius: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(255,255,255,0.1)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "2px",
              background: theme.palette.secondary.main,
              top: "-1px",
            },
          }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ opacity: 0.6 }}
          component={motion.p}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Archana RamKishori Welfare Foundation.
          All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
