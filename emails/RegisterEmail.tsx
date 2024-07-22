import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LoginPasswordProps {
  password: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const LoginPasswordEmail = ({
  password,
}: LoginPasswordProps) => (
  <Html>
    <Head />
    <Preview>You have been registered</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src='https://pwms.xyz/_next/image?url=%2FPWMS.png&w=96&q=75'
          width="70"
          height="70"
          
        />
        <Heading style={heading}>You have Been Registered</Heading>
        <Section style={codeContainer}>
        <Text style={code}>{password}</Text>
        </Section>
        <Section style={buttonContainer}>
          <Button style={button} href="https://pwms.xyz/sign-in">
            Login to PWMS
          </Button>
        </Section>
        <Text style={paragraph}>
          You can start look at your task, by clicking the button and use the password above to login
        </Text>
        <Hr style={hr} />
        <Link href="https://pwms.xyz/sign-in" style={reportLink}>
          PWMS
        </Link>
      </Container>
    </Body>
  </Html>
);


export default LoginPasswordEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#1f1d1d",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "35px auto 10px",
  verticalAlign: "middle",
  width: "280px",
};
