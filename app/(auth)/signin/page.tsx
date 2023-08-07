import React from "react";
import Link from "next/link";
import styles from "./LoginScreen.module.css";

interface ProfileProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Login({ params, searchParams }: ProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Stickerfinder.ch</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>Login</h2>
          <input
            type="text"
            placeholder="Username/E-Mail"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Passwort"
            className={styles.input}
          />
          <div className={styles.otherLogin}>
            <span>oder melde dich an mit</span>

            <div className={styles.placeholder}></div>
          </div>
          <button className={styles.submitButton}>Bestätigen</button>
          <p className={styles.signUp}>
            Haben Sie noch keinen Account?{" "}
            <Link href="/signup">Registrieren</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
