"use client";
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import theme, { colors } from "../theme/theme";

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

export default function Hero() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <Box
      component={motion.div}
      animate={controls}
      style={{ opacity }}
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        textAlign: "center",
        overflow: "hidden",
        background: colors.gradient.primary,
        backgroundSize: "400% 400%",
        color: colors.light,
        px: { xs: 2, md: 0 },
        py: 10,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 20% 20%, rgba(0, 242, 234, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0,
        },
      }}
    >
      {/* Premium animated particles */}
      {[...Array(20)].map((_, i) => (
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
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2],
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
            background: i % 2 === 0 ? colors.secondary : colors.gold,
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
        />
      ))}

      <Box
        component={motion.div}
        animate={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        sx={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Typography
            variant={isMobile ? "h2" : "h1"}
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
              textShadow: `0 2px 20px rgba(0,0,0,0.3)`,
              background: `linear-gradient(45deg, ${colors.light} 30%, ${colors.secondary} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
            }}
          >
            Connecting Humanity,
            <br />
            <Box
              component="span"
              sx={{
                background: colors.gradient.gold,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Inspiring People
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              mb: 4,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              maxWidth: "800px",
              mx: "auto",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            Join us in making the world a better place. Your small contribution
            can bring big change!
          </Typography>
        </motion.div>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="contained"
            size="large"
            component={motion.button}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 30px ${colors.secondary}66`,
            }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 700,
              background: colors.gradient.accent,
              color: colors.primary,
              textTransform: "none",
              letterSpacing: "0.05em",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                transition: "all 0.6s ease",
              },
              "&:hover::before": {
                left: "100%",
              },
            }}
          >
            Donate Now
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={motion.button}
            whileHover={{
              scale: 1.05,
              backgroundColor: `${colors.secondary}11`,
            }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 700,
              border: `2px solid ${colors.secondary}`,
              color: colors.secondary,
              backdropFilter: "blur(8px)",
              textTransform: "none",
              letterSpacing: "0.05em",
              "&:hover": {
                border: `2px solid ${colors.secondary}`,
                boxShadow: `0 0 20px ${colors.secondary}33`,
              },
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Box>

      {/* Enhanced scroll indicator */}
      <motion.div
        animate={floatingAnimation}
        style={{
          position: "absolute",
          bottom: "40px",
          display: isMobile ? "none" : "block",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            color: colors.secondary,
            letterSpacing: "0.1em",
          }}
        >
          SCROLL TO EXPLORE
        </Typography>
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Box
            sx={{
              width: "24px",
              height: "40px",
              borderRadius: "12px",
              border: `2px solid ${colors.secondary}`,
              position: "relative",
              mx: "auto",
              "&::before": {
                content: '""',
                position: "absolute",
                width: "4px",
                height: "8px",
                borderRadius: "2px",
                background: colors.secondary,
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animation: "scroll 2s ease-in-out infinite",
              },
            }}
          />
        </motion.div>
      </motion.div>
    </Box>
  );
}
