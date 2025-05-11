import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../theme/theme";

export default function DonationCard() {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -5 }}
      sx={{
        background: `linear-gradient(135deg, ${colors.light} 0%, rgba(248,249,252,0.9) 100%)`,
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Make a Difference
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: colors.gradient.gold,
            color: colors.primary,
          }}
        >
          Donate Now
        </Button>
      </CardContent>
    </Card>
  );
}
