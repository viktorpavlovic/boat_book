import React from "react";
import "./successModal.scss";
import {
  BlobProvider,
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
  // Font
} from "@react-pdf/renderer";
import qrCode from "../../assets/qr-code.jpg";
import dayjs from "dayjs";
// import Roboto from "typeface-roboto"

const SuccessModal = ({ setSuccess, ticketInfo, selectedRide }) => {
  console.log(ticketInfo);
  // setTimeout (() => {console.log(selectedRide)}, 1000)
  
  //   Font.register({family:'Roboto', format:'truetype', src: Roboto
  // })
  const tourDate = dayjs(new Date(ticketInfo.date)).format("ddd DD-MM HH:mm");
  const meetingTime = dayjs(new Date(tourDate - 1800000)).format("HH:mm");
  const styles = StyleSheet.create({
    page: {
      width: "88%",
      margin: "0 0 0 20px",
      paddingTop: "200px",
      justifyContent: "center",
      alignItems: "center",
    },
    qrCode: {
      position: "absolute",
      top: 20,
      right: 20,
      width: "35%",
    },
    fullp: {
      width: "100%",
      paddingVertical: "15px",
      borderTop: "2px solid black",
      display: "flex",
      flexDirection: "column",
    },
    fullBottom: {
      width: "100%",
      paddingVertical: "15px",
      borderTop: "2px solid black",
      display: "flex",
      flexDirection: "row",
    },
    halfp: {
      width: "100%",
      // margin: "10px",
    },
    // middle: {
    //   width: "100%"
    // },
    meetTitle: {
      paddingBottom: "10px",
      fontWeight: "extrabold",
      fontSize: "16px",
      position: "absolute",
      top: 20,
      left: 0,
      color: "blue",
    },
    meetAddress: {
      fontSize: "13px",
      position: "absolute",
      top: 50,
      left: 0,
      width: "50%",
      textAlign: "center",
      color: "blue",
    },
    meetPointTime: {
      fontSize: "16px",
      textDecoration: "underline",
      position: "absolute",
      top: 150,
      left: 0,
    },
    tourText: {
      paddingBottom: '5px',
      fontSize: '15px'
    },
    passengersTitle: {
      paddingBottom: "10px",
      textTransform: "uppercase",
      fontSize: "13px",
    },
    passengersText: {
      paddingBottom: "20px",
      textTransform: "uppercase",
      fontSize: "12px",
    },
    isPaid: {
      textTransform: "uppercase",
      fontSize: "14px",
      color: 'red',
    },
  });
  const Tiketino = (
    <Document>
      <Page size="B6">
        <View style={styles.page}>
          <Text style={styles.meetTitle}>Meeting point address:</Text>
          <Text style={styles.meetAddress} wrap>Main entrance of Kalemegdan park from Knez Mihailova street Pariska 15, Belgrade</Text>
          <Text style={styles.meetPointTime}>{"Meeting point time: " + meetingTime}</Text>
          <Image src={qrCode} style={styles.qrCode} />
          <View style={styles.fullp}>

            <View style={styles.halfp}>
              <Text style={styles.tourText}>{"Tour: " + selectedRide?.data.name}</Text>
              <Text style={styles.tourText}>{"Room or name: " + ticketInfo.roomNumber}</Text>
              <Text style={styles.tourText}>{"Day/Date/departure time: " + tourDate}</Text>
            </View>
            
          </View>
          <View style={styles.fullBottom}>
            <View style={styles.halfp}>
              <Text style={styles.passengersTitle}>Adults:</Text>
              <Text style={styles.passengersText}>{ticketInfo.numberOfPassengers} passengers</Text>
              <Text style={styles.isPaid}>{JSON.parse(ticketInfo.isPaid) ? "Paid in cash:" : "Not paid:"}</Text> 
              <Text style={styles.isPaid}>{ticketInfo.ticketPrice + " dinars"}</Text>
            </View>

            <View style={styles.halfp}>
              <Text style={styles.passengersTitle}>Kids 8-12 years:</Text>
              <Text style={styles.passengersText}>
                {ticketInfo.preteens} passengers
              </Text>
              <Text style={styles.passengersTitle}>Kids 0-7 years:</Text>
              <Text style={styles.passengersText}>
                {ticketInfo.children} passengers
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className="successModal" onClick={() => setSuccess(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <BlobProvider document={Tiketino}>
          {({ blob, url, loading, error }) => {
            return (
              <div>
                <p>bravo majmune!</p>
                <a href={url} download="ticket">
                  download
                </a>
                <br />
                <button onClick={() => window.open(url, "_blank")}>
                  open in new tab
                </button>
              </div>
            );
          }}
        </BlobProvider>
      </div>
    </div>
  );
};

export default SuccessModal;
