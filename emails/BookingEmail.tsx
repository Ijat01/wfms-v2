import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

    interface BookingProps {
        groomname: string;
        bridename: string;
        contactno: string;
        packagename:string | undefined;
        paymenttotal:string;
        handleby:string;
        amountpaid:string;
        balance:number;
        eventdate:string;
        eventtime:string;
      }

const formatDate = (date: Date) => {
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();
return `${day}/${month}/${year}`;
};

const currentDate = formatDate(new Date());


  
  export const BookingEmail = ({groomname, bridename, contactno, packagename,paymenttotal,handleby,amountpaid, balance, eventdate, eventtime}: BookingProps) => (

    <Html>
      <Head />
      <Preview>New Booking</Preview>
  
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Img
                  src='https://pwms.xyz/_next/image?url=%2FPWMS.png&w=96&q=75'
                  width="70"
                  height="70"
                  alt="PWMS LOGO"
                />
              </Column>
  
              <Column align="right" style={tableCell}>
                <Text style={heading}>Booking Details</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text style={cupomText}>
              New booking has been added into the system
            </Text>
          </Section>
          <Section>
            <Text style={customertext}>
              Customer Details
            </Text>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Groom Name</Text>
                      <Text style={informationTableValue}>{groomname}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Bride Name</Text>
                      <Text style={informationTableValue}>{bridename}</Text>
                    </Column>
                  </Row>
  
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Booking Date</Text>
                      <Text style={informationTableValue}>{currentDate}</Text>
                     
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Contact No</Text>
                      <Text style={informationTableValue}>{contactno}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>Handle by</Text>
                      <Text style={informationTableValue}>{handleby}</Text>
                    </Column>
                  </Row>
                  
  
                </Section>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
          <Text style={productsTitle}>Package</Text>
        </Section>
        <Section>
          <Row>
            <Column style={{ paddingLeft: "22px" }}>
              <Text style={productTitle}>{packagename}</Text>

            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>RM {paymenttotal}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>GRAND TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>RM {paymenttotal}</Text>
            </Column>
          </Row>
          <Hr style={productLineBottom} />
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>AMOUNT PAID</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>RM {amountpaid}</Text>
            </Column>
          </Row>
          <Hr style={productLineBottom} />
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>BALANCE</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>RM {balance}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLineBottom} />
          <Section>
          <Column align="center" style={ctaTitle}>
            <Text style={ctaText}>Please log in into the system to view more details about this booking</Text>
          </Column>
        </Section>
        <Hr style={walletBottomLine} />
        <Text style={footerText}>
          This email is a reminder that a new booking has been created in the system.
        </Text>
        <Text style={footerText}>
          For any questions or modifications, please log in to the admin panel or contact individual responsible for this booking.
        </Text>
        <Text style={footerText}>
          Thank you for using our services.
        </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default BookingEmail;
  
  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: "#ffffff",
  };
  
  const resetText = {
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "660px",
    maxWidth: "100%",
  };
  
  const tableCell = { display: "table-cell" };
  
  const heading = {
    fontSize: "20px",
    fontWeight: "300",
    color: "#888888",
  };
  
  const cupomText = {
    textAlign: "center" as const,
    margin: "36px 0 40px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#111111",
  };
  
  const supStyle = {
    fontWeight: "300",
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
    fontSize: "10px",
  };

  const customertext = {
    fontSize: "16px",
    fontWeight: "500",
    paddingLeft: "5px",
  };
  
  const informationTableValue = {
    fontSize: "12px",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const productTitleTable = {
    ...informationTable,
    margin: "30px 0 15px 0",
    height: "24px",
  };
  
  const productsTitle = {
    background: "#fafafa",
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0",
  };
  
  const productIcon = {
    margin: "0 0 0 20px",
    borderRadius: "14px",
    border: "1px solid rgba(128,128,128,0.2)",
  };
  
  const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };
  
  const productDescription = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    ...resetText,
  };
  
  const productLink = {
    fontSize: "12px",
    color: "rgb(0,112,201)",
    textDecoration: "none",
  };
  
  const divisor = {
    marginLeft: "4px",
    marginRight: "4px",
    color: "rgb(51,51,51)",
    fontWeight: 200,
  };
  
  const productPriceTotal = {
    margin: "0",
    color: "rgb(102,102,102)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "0px 30px 0px 0px",
    textAlign: "right" as const,
  };
  
  const productPrice = {
    fontSize: "12px",
    fontWeight: "600",
    margin: "0",
  };
  
  const productPriceLarge = {
    margin: "0px 20px 0px 0px",
    fontSize: "16px",
    fontWeight: "600",
    whiteSpace: "nowrap" as const,
    textAlign: "right" as const,
  };
  
  const productPriceWrapper = {
    display: "table-cell",
    padding: "0px 20px 0px 0px",
    width: "100px",
    verticalAlign: "top",
  };
  
  const productPriceLine = { margin: "30px 0 0 0" };
  
  const productPriceVerticalLine = {
    height: "48px",
    borderLeft: "1px solid",
    borderColor: "rgb(238,238,238)",
  };
  
  const productPriceLargeWrapper = { display: "table-cell", width: "90px" };
  
  const productPriceLineBottom = { margin: "0 0 75px 0" };
  const productLineBottom = { margin: "0 0 0px 0" };
  
  const block = { display: "block" };
  
  const ctaTitle = {
    display: "block",
    margin: "15px 0 0 0",
  };
  
  const ctaText = { fontSize: "16px", fontWeight: "500" };
  
  const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };
  
  const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };
  
  const walletImage = {
    display: "inherit",
    paddingRight: "8px",
    verticalAlign: "middle",
  };
  
  const walletBottomLine = { margin: "65px 0 20px 0" };
  
  const footerText = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    margin: "0",
    lineHeight: "auto",
    marginBottom: "16px",
  };
  
  const footerTextCenter = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    margin: "20px 0",
    lineHeight: "auto",
    textAlign: "center" as const,
  };
  
  const footerLink = { color: "rgb(0,115,255)" };
  
  const footerIcon = { display: "block", margin: "40px 0 0 0" };
  
  const footerLinksWrapper = {
    margin: "8px 0 0 0",
    textAlign: "center" as const,
    fontSize: "12px",
    color: "rgb(102,102,102)",
  };
  
  const footerCopyright = {
    margin: "25px 0 0 0",
    textAlign: "center" as const,
    fontSize: "12px",
    color: "rgb(102,102,102)",
  };
  
  const walletLinkText = {
    fontSize: "14px",
    fontWeight: "400",
    textDecoration: "none",
  };
  