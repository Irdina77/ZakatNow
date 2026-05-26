import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ZakatCalculator from "./pages/ZakatCalculator";
import Profile from "./pages/Profile";
import NisabPage from "./pages/NisabPage";
import BusinessSetup from "./pages/BusinessSetup";
import ResultPage from "./pages/ResultPage";
import PaymentPage from "./pages/PaymentPage";
import TransferPage from "./pages/TransferPage";
import PaymentHistory from "./pages/PaymentHistory";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateNisabRate from "./pages/UpdateNisabRate";

import "./App.css";
import "./Styles/ZakatCalculator.css";

export default function App() {
  const navigate = useNavigate();

  const defaultResult = {
    zakatAmount: 0,
    nisabStatus: "Not calculated",
    method: "-",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [result, setResult] = useState(defaultResult);
  const [currentCalculation, setCurrentCalculation] = useState(null);

  const [payment, setPayment] = useState({
    paymentId: "PAY-2026-001",
    amount: 0,
    gateway: "FPX / Online Banking",
    status: "Pending",
  });

  const [transfer, setTransfer] = useState({
    transferId: "TRF-2026-001",
    bankName: "Maybank",
    zakatOrganization: "Kelantan Zakat Organization",
    status: "Pending",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("userRole");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setUserRole(storedRole === "admin" ? "admin" : "user");
    }
  }, []);

  useEffect(() => {
    const savedResult = localStorage.getItem("zakat-result");

    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      setResult(parsedResult);

      setPayment((prev) => ({
        ...prev,
        amount: parsedResult.zakatAmount || 0,
      }));
    }
  }, []);

  const handleLoginSuccess = (role = "user") => {
    setIsLoggedIn(true);
    setUserRole(role);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleRegisterSuccess = () => {
    navigate("/login");
  };

  const handlePaymentSuccess = (paymentInfo) => {
    const updatedPayment = {
      ...payment,
      ...paymentInfo,
      status: paymentInfo.status || "Success",
    };

    setPayment(updatedPayment);
    savePaymentHistory(updatedPayment);

    setTransfer((prev) => ({
      ...prev,
      status: "Success",
    }));

    navigate("/transfer");
  };

  const handleCalculatorComplete = (calculatorResult) => {
    const newResult = {
      zakatAmount: Number(calculatorResult.zakat) || 0,
      nisabStatus:
        calculatorResult.total >= calculatorResult.nisab
          ? "Eligible"
          : "Not Eligible",
      method:
        calculatorResult.businessMethod === "UntungRugi"
          ? "Profit & Loss"
          : "Working Capital",
    };

    setResult(newResult);
    setCurrentCalculation(calculatorResult);

    setPayment((prev) => ({
      ...prev,
      amount: Number(calculatorResult.zakat) || 0,
    }));

    localStorage.setItem("zakat-result", JSON.stringify(newResult));
    localStorage.setItem(
      "currentCalculation",
      JSON.stringify(calculatorResult)
    );
    navigate("/payment");
  };

  const savePaymentHistory = (paymentInfo) => {
    const history = JSON.parse(localStorage.getItem("zakatHistory") || "[]");
    const calculation =
      currentCalculation ||
      JSON.parse(localStorage.getItem("currentCalculation") || "null");

    const record = {
      date: new Date().toLocaleString(),
      year: calculation?.selectedYear || "-",
      state: calculation?.selectedState || "-",
      businessMethod: calculation?.businessMethod || "-",
      total: calculation?.total || paymentInfo.amount || 0,
      zakat: calculation?.zakat || paymentInfo.amount || 0,
      gateway: paymentInfo.gateway || "-",
      bankName: paymentInfo.bankName || "-",
      transactionId: paymentInfo.transactionId || "-",
      status: paymentInfo.status || "Success",
    };

    localStorage.setItem("zakatHistory", JSON.stringify([...history, record]));
  };

  return (
    <LanguageProvider>
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route
          path="/register"
          element={<Register onRegisterSuccess={handleRegisterSuccess} />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/calculator"
          element={
            isLoggedIn ? (
              <ZakatCalculator onComplete={handleCalculatorComplete} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/calculate-zakat"
          element={
            isLoggedIn ? (
              <ZakatCalculator onComplete={handleCalculatorComplete} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/nisab"
          element={
            isLoggedIn ? <NisabPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/nisab-rate"
          element={
            isLoggedIn ? <NisabPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/business-setup"
          element={
            isLoggedIn ? <BusinessSetup /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/payment"
          element={
            isLoggedIn ? (
              <PaymentPage
                payment={payment}
                onPay={handlePaymentSuccess}
                onBack={() => navigate("/dashboard")}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/pay-zakat"
          element={
            isLoggedIn ? (
              <PaymentPage
                payment={payment}
                onPay={handlePaymentSuccess}
                onBack={() => navigate("/dashboard")}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/transfer"
          element={
            isLoggedIn ? (
              <TransferPage transfer={transfer} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/check-zakat"
          element={
            isLoggedIn ? (
              <PaymentHistory />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/result"
          element={
            isLoggedIn ? (
              <ResultPage
                result={result}
                onSave={() => {
                  localStorage.setItem(
                    "zakat-result",
                    JSON.stringify(result)
                  );
                  alert("Calculation saved successfully!");
                }}
                onReset={() => {
                  localStorage.removeItem("zakat-result");
                  setResult(defaultResult);
                  setPayment({
                    paymentId: "PAY-2026-001",
                    amount: 0,
                    gateway: "FPX / Online Banking",
                    status: "Pending",
                  });
                  setTransfer({
                    transferId: "TRF-2026-001",
                    bankName: "Maybank",
                    zakatOrganization: "Kelantan Zakat Organization",
                    status: "Pending",
                  });
                  alert("Calculation reset.");
                }}
                onProceedToPayment={() => {
                  if (!result || Number(result.zakatAmount) <= 0) {
                    alert("Please calculate zakat first.");
                    return;
                  }
                  navigate("/payment");
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/nisab"
          element={
            isLoggedIn && userRole === "admin" ? (
              <UpdateNisabRate />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/update-nisab"
          element={
            isLoggedIn && userRole === "admin" ? (
              <UpdateNisabRate />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}