"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../theme/theme";
import { donationSchema, type DonationFormData } from "../types/donation";
import { razorpayService } from "../services/razorpay";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const predefinedAmounts = [100, 500, 1000, 5000, 10000];

export default function DonationPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: `linear-gradient(135deg, ${colors.primary}11 0%, ${colors.secondary}11 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h2" gutterBottom>
                Make a Difference Today
              </Typography>
              <Typography variant="body1" paragraph>
                Your donation helps us continue our mission of creating positive
                change in communities worldwide.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <DonationForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function DonationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 500,
      currency: "INR",
    },
  });

  const amount = watch("amount");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAmountSelect = (value: number) => {
    setValue("amount", value, { shouldValidate: true });
  };

  const onSubmit = async (data: DonationFormData) => {
    try {
      setLoading(true);
      setError("");

      const orderData = await razorpayService.createOrder(data);
      const options = razorpayService.getRazorpayOptions(orderData, data);

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.success", async (response: any) => {
        await razorpayService.verifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
        // Handle success
      });

      rzp.on("payment.error", (error: any) => {
        setError(error.description || "Payment failed");
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      elevation={3}
      sx={{ p: 4, borderRadius: 2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant="h5" gutterBottom>
            Make a Donation
          </Typography>

          <Grid container spacing={2}>
            {predefinedAmounts.map((preset) => (
              <Grid item xs={4} key={preset}>
                <Button
                  fullWidth
                  variant={amount === preset ? "contained" : "outlined"}
                  onClick={() => handleAmountSelect(preset)}
                >
                  ₹{preset}
                </Button>
              </Grid>
            ))}
          </Grid>

          <TextField
            {...register("amount")}
            label="Custom Amount"
            type="number"
            error={!!errors.amount}
            helperText={errors.amount?.message}
            InputProps={{
              startAdornment: "₹",
            }}
          />

          <TextField
            {...register("name")}
            label="Full Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("phone")}
            label="Phone (Optional)"
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Donate ₹${amount}`
            )}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
