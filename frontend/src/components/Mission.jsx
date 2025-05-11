"use client";
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { colors } from "../theme/theme";

export default function Mission() {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const missionItems = [
    {
      icon: "📚",
      title: "Education",
      description: "Providing quality education to underprivileged children",
      gradient: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Ensuring access to medical facilities for all",
      gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
    },
    // {
    //   icon: "🤝",
    //   title: "Livelihoods",
    //   description: "Creating sustainable employment opportunities",
    //   gradient:
    //     "linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
    // },
    {
      icon: "🌱",
      title: "Environment",
      description: "Promoting eco-friendly practices in communities",
      gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
      ref={ref}
    >
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            top: `${i * 30}%`,
            right: `${i * 20 - 10}%`,
            width: 300 + i * 100,
            height: 300 + i * 100,
            borderRadius: "50%",
            border: `2px solid ${colors.secondary}11`,
            opacity: 0.1,
          }}
        />
      ))}

      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          sx={{ width: "100%", maxWidth: "1200px" }}
        >
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 800,
              mb: 6,
              background: colors.gradient.gold,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 4,
                background: colors.gradient.accent,
                borderRadius: 2,
              },
            }}
          >
            Our Mission
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{
              mb: 8,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {missionItems.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  style={{ width: "100%", maxWidth: "300px" }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: item.gradient,
                      },
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: `0 20px 40px ${colors.secondary}22`,
                      },
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {item.icon}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        textAlign: "center",
                        background: item.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        color: colors.primary,
                        opacity: 0.8,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 100%)`,
              backdropFilter: "blur(10px)",
              boxShadow: `0 10px 30px ${colors.primary}11`,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "center",
                background: colors.gradient.accent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 4,
              }}
            >
              Our Values
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: "1.1rem",
                textAlign: "center",
                color: colors.primary,
                lineHeight: 1.8,
              }}
            >
              We believe in the power of communities to drive their own
              development. Our approach focuses on building local capacity,
              fostering leadership, and creating sustainable systems that
              continue to benefit people long after our direct involvement.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
