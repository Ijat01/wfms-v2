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
    Column,
    Row
  } from "@react-email/components";
  import * as React from "react";
  
  interface SingleTaskProps {
    name:string,
    taskrole:string,
    groomname:string | undefined,
    bridename:string | undefined,
    eventtype:string | null,
    eventdate:string,
    eventtime:string | null,
    seceventtype:string | null,
    seceventdate:string | undefined,
    seceventtime:string | null,
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const MultipleTaskEmail = ({
    name,
    taskrole,
    groomname,
    bridename,
    seceventtype,
    seceventdate,
    seceventtime,
    eventtype,
    eventdate,
    eventtime,
  }: SingleTaskProps) => (
    <Html>
      <Head />
      <Preview>You have been assigned to task</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src='https://pwms.xyz/_next/image?url=%2FPWMS.png&w=96&q=75'
            width="70"
            height="70"
            
          />
          <Heading style={heading}>You have been assigned to task</Heading>
          <Section>
            <Text style={customertext}>
             First Event Details
            </Text>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Staff Name</Text>
                      <Text style={informationTableValue}>{name}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Task Role</Text>
                      <Text style={informationTableValue}>{taskrole}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Groom Name</Text>
                      <Text style={informationTableValue}>{groomname}</Text>
                     
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Bride Name</Text>
                      <Text style={informationTableValue}>{bridename}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Type</Text>
                      <Text style={informationTableValue}>{eventtype}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Date</Text>
                      <Text style={informationTableValue}>{eventdate}</Text>
                     
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Time</Text>
                      <Text style={informationTableValue}>{eventtime}</Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>
          </Section>
          <Hr style={taskBottomLine}/>
          <Section>
            <Text style={customertext}>
             Second Event Details
            </Text>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Staff Name</Text>
                      <Text style={informationTableValue}>{name}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Task Role</Text>
                      <Text style={informationTableValue}>{taskrole}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Groom Name</Text>
                      <Text style={informationTableValue}>{groomname}</Text>
                     
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Bride Name</Text>
                      <Text style={informationTableValue}>{bridename}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Type</Text>
                      <Text style={informationTableValue}>{seceventtype}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Date</Text>
                      <Text style={informationTableValue}>{seceventdate}</Text>
                     
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Event Time</Text>
                      <Text style={informationTableValue}>{seceventtime}</Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>
          </Section>
          <Section style={buttonContainer}>
            <Button style={button} href="https://pwms.xyz/sign-in">
              Login to PWMS
            </Button>
          </Section>
          <Text style={paragraph}>
            Please log in into the system to view your task
          </Text>
          <Hr style={walletBottomLine} />
            <Text style={footerText}>
                This email is a reminder that a you has been assigned to a task in the system.
            </Text>
            <Text style={footerText}>
                For more information of the task, please log into the system or contact individual responsible for this task assignation.
            </Text>
            <Text style={footerText}>
                Thank you for using our services.
            </Text>
        </Container>
      </Body>
    </Html>
  );
  
  
  export default MultipleTaskEmail;
  

  const resetText = {
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const customertext = {
    fontSize: "16px",
    fontWeight: "500",
    paddingLeft: "5px",
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
  };
  
  const heading = {
    fontSize: "20px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
    padding: "17px 0 0",
    textAlign: "center" as const,
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
  
  const taskBottomLine = { margin: "30px 0 10px 0" };
  const walletBottomLine = { margin: "65px 0 20px 0" };
  
  const footerText = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    margin: "0",
    lineHeight: "auto",
    marginBottom: "16px",
  };
  
 const informationTable = {
    borderCollapse: "collapse" as const,
    borderSpacing: "0px",
    color: "rgb(51,51,51)",
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "3px",
    fontSize: "12px",
  };
  
  const informationTableRow = {
    height: "46px",
  };
  
  const informationTableColumn = {
    paddingLeft: "20px",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "0px 1px 1px 0px",
    height: "44px",
  };
  
  const informationTableLabel = {
    ...resetText,
    color: "rgb(102,102,102)",
    fontSize: "11px",
  };

  const informationTableValue = {
    fontSize: "12px",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
    fontWeight:"500"
  };
  
  

  