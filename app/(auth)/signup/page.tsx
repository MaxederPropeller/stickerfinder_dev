"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./SignUpScreen.module.css";

interface ProfileProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignUp(props: ProfileProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Stickerfinder.ch</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.signUpBox}>
          <h2 className={styles.signUpTitle}>Registrieren</h2>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="E-Mail"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort bestätigen"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className={styles.agbLabel}>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            Ich stimme den AGB zu
          </label>
          <button className={styles.submitButton}>Bestätigen</button>
          <p className={styles.login}>
            Haben Sie bereits einen Account? <Link href="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
