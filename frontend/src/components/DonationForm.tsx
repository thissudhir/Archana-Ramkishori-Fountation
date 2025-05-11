"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
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
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../theme/theme";
import { DonationData, PaymentIntentResponse } from "../types";
import { apiService } from "../services/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface DonationFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const predefinedAmounts = [10, 25, 50, 100, 250, 500];

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

const DonationForm = ({ onSuccess, onError }: DonationFormProps) => {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DonationData>({
    defaultValues: {
      amount: 10,
      email: "",
      currency: "USD",
    },
  });

  const amount = watch("amount");

  const handleAmountSelect = (value: number) => {
    setValue("amount", value, { shouldValidate: true });
  };

  const onSubmit = async (data: DonationFormData) => {
    try {
      setIsLoading(true);
      setPaymentError("");

      const response = await apiService.createDonation(data);
      setClientSecret(response.clientSecret);

      if (!stripe || !elements) {
        throw new Error("Stripe has not been initialized");
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donate/success`,
          receipt_email: data.email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Payment failed");
      setPaymentError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
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
            Choose Amount
          </Typography>
          
          <Grid container spacing={2}>
            {predefinedAmounts.map((preset) => (
              <Grid item xs={4} key={preset}>
                <Button
                  fullWidth
                  variant={amount === preset ? "contained" : "outlined"}
                  onClick={() => handleAmountSelect(preset)}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  ${preset}
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
              startAdornment: "$",
            }}
          />

          <TextField
            {...register("email")}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <AnimatePresence>
            {clientSecret && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PaymentElement />
              </motion.div>
            )}
          </AnimatePresence>

          {paymentError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {paymentError}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || !stripe}
            sx={{ mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Donate $${amount}`
            )}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
