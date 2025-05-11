"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  MonetizationOn,
  Group,
  School,
  LocalHospital,
  Agriculture,
  Palette,
  Restaurant,
  Build,
  Computer,
  ChildCare,
  Verified,
  Timeline,
  People,
  Language,
  ArrowRightAlt,
} from "@mui/icons-material";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
  const theme = useTheme();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const focusAreas = [
    {
      icon: <Group />,
      text: "Family Welfare",
      color: theme.palette.primary.main,
    },
    {
      icon: <School />,
      text: "Education",
      color: theme.palette.secondary.main,
    },
    { icon: <LocalHospital />, text: "Healthcare", color: "#4CAF50" },
    { icon: <Agriculture />, text: "Agriculture", color: "#8BC34A" },
    { icon: <Palette />, text: "Art and Culture", color: "#9C27B0" },
    { icon: <Restaurant />, text: "Food Security", color: "#FF9800" },
    { icon: <Build />, text: "Skill Development", color: "#795548" },
    { icon: <Computer />, text: "IT", color: "#2196F3" },
    { icon: <ChildCare />, text: "Child Welfare", color: "#FF5722" },
  ];

  const operationalPrinciples = [
    {
      icon: <Verified />,
      text: "100% Accountability: Every rupee goes toward impactful projects",
      color: theme.palette.success.main,
    },
    {
      icon: <Timeline />,
      text: "Real-Time Impact Reports: Donors receive updates on their contributions",
      color: theme.palette.info.main,
    },
    {
      icon: <People />,
      text: "Collaborative Approach: We work with NGOs, government, and private organizations",
      color: theme.palette.warning.main,
    },
    {
      icon: <Language />,
      text: "Digital Fundraising & Outreach: Using technology to connect with donors efficiently",
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        position: "relative",
        overflow: "hidden",
        pt: 2,
        pb: 10,
      }}
    >
      {/* Animated floating particles */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: ["110vh", `-${10 + Math.random() * 20}vh`],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            rotate: [0, 360],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          sx={{
            position: "absolute",
            width: `${2 + Math.random() * 8}px`,
            height: `${2 + Math.random() * 8}px`,
            background:
              i % 2 === 0
                ? theme.palette.secondary.main
                : theme.palette.warning.main,
            borderRadius: "50%",
            filter: "blur(1px)",
            zIndex: 0,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", py: 10 }}>
            <motion.div variants={fadeIn}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                About ARKWF
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: theme.palette.common.white,
                  opacity: 0.9,
                  maxWidth: "800px",
                  mx: "auto",
                }}
              >
                Welcome to Archana RamKishori Welfare Foundation (ARKWF),
                founded in 2025. We are a mission-driven organization dedicated
                to transforming lives through collective goodwill.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowRightAlt />}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  boxShadow: `0 4px 20px ${theme.palette.secondary.main}40`,
                }}
              >
                Join Our Mission
              </Button>
            </motion.div>
          </Box>

          {/* Vision Section */}
          <motion.div variants={fadeIn} sx={{ mb: 10 }}>
            <Card
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${theme.palette.secondary.main}30`,
                boxShadow: `0 8px 32px ${theme.palette.primary.dark}80`,
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.warning.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Our Vision
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.common.white,
                  mb: 4,
                }}
              >
                We envision a world where small efforts lead to big change. Our
                focus areas include family welfare, education, healthcare,
                agriculture, environment, art and culture, food security, skill
                development, IT, and child welfare.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.common.white,
                }}
              >
                We aim to uplift underprivileged communities and create
                sustainable solutions for a better future.
              </Typography>
            </Card>
          </motion.div>

          {/* Focus Areas */}
          <motion.div variants={fadeIn} sx={{ mb: 10 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                mb: 6,
                fontWeight: 700,
                color: theme.palette.common.white,
                textAlign: "center",
              }}
            >
              Our{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.warning.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Focus Areas
              </Box>
            </Typography>
            <Grid container spacing={3}>
              {focusAreas.map((area, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      boxShadow: `0 20px 40px ${area.color}40`,
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    sx={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${area.color}30`,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${area.color}, ${theme.palette.common.white})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                          color: theme.palette.common.white,
                          fontSize: "1.8rem",
                        }}
                      >
                        {area.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.common.white,
                          mb: 2,
                        }}
                      >
                        {area.text}
                      </Typography>
                      <AnimatePresence>
                        {hoveredCard === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.common.white,
                                opacity: 0.8,
                              }}
                            >
                              Learn more about our {area.text.toLowerCase()}{" "}
                              initiatives.
                            </Typography>
                            <Button
                              size="small"
                              endIcon={<ArrowRightAlt />}
                              sx={{
                                mt: 2,
                                color: area.color,
                                fontWeight: 600,
                              }}
                            >
                              Explore
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Micro-Donation Model */}
          <motion.div variants={fadeIn} sx={{ mb: 10 }}>
            <Paper
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                color: theme.palette.common.white,
                boxShadow: `0 8px 32px ${theme.palette.secondary.dark}80`,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, mb: 4 }}
              >
                Micro-Donation Model
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 500 }}>
                Power of ₹21 Every Month
              </Typography>
              <List sx={{ mb: 4 }}>
                {[
                  "Low Barrier to Entry: ₹21 is affordable, making it easy for everyone to contribute.",
                  "Community-Driven Approach: We build a network of care and responsibility.",
                  "Targeted Assistance: Helping families in crisis, students in need, and medical aid seekers.",
                  "Scalability: As supporters grow, so does our impact.",
                  "Empowering Grassroots Initiatives: Supporting local changemakers.",
                  "Helping Families Without Income: Assisting families who lost their sole breadwinner.",
                ].map((text, index) => (
                  <ListItem
                    key={index}
                    sx={{ alignItems: "flex-start", px: 0 }}
                  >
                    <ListItemIcon
                      sx={{ minWidth: 40, color: theme.palette.common.white }}
                    >
                      <MonetizationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        variant: "body1",
                        sx: { color: theme.palette.common.white },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowRightAlt />}
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  boxShadow: `0 4px 20px ${theme.palette.primary.dark}80`,
                }}
              >
                Start Donating
              </Button>
            </Paper>
          </motion.div>

          {/* Operational Principles */}
          <motion.div variants={fadeIn}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                mb: 6,
                fontWeight: 700,
                color: theme.palette.common.white,
                textAlign: "center",
              }}
            >
              Our{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.warning.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Operational Principles
              </Box>
            </Typography>
            <Grid container spacing={3}>
              {operationalPrinciples.map((principle, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    sx={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${principle.color}30`,
                      borderRadius: 3,
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", gap: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: principle.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.common.white,
                            fontSize: "1.8rem",
                            flexShrink: 0,
                          }}
                        >
                          {principle.icon}
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "1.1rem",
                          }}
                        >
                          {principle.text}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
