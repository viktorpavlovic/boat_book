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
  Font
} from "@react-pdf/renderer";
import ticketImage from '../../assets/ticket.jpg'
import Roboto from "typeface-roboto"

const SuccessModal = ({ setSuccess, ticketInfo }) => {
  
  Font.register({family:'Roboto', format:'truetype', src: Roboto
})
  const styles = StyleSheet.create({
    page: {
      width: '78%',
      margin: '0 35px 0 65px',
      paddingTop: '200px',
      justifyContent: "center",
      alignItems: "center",
      
    },
    pageBackground: {
      position: 'absolute',
        top: 0,
        left: 0,
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
      },
      fullp:{
        width:'100%',
        paddingVertical: '20px',
        borderTop: '4px solid black',
        display: 'flex',
        flexDirection: 'row'
      },
      halfp:{
        width: '40%',
        margin: '10px',
      },
      tourText:{
        paddingBottom: '5px',
        fontSize: '9px'
      },
      tourTitle:{
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        paddingBottom: '10px',
        fontSize: '12px',        
      },
      passengersTitleBig:{
        paddingBottom: '10px',
        textTransform:'uppercase',
        fontSize: '16px'        
      },
      passengersTextBig:{
        paddingBottom: '5px',
        textTransform:'uppercase',
        fontSize: '9px'
      },
      passengersTitleSmall:{
        fontFamily: 'Roboto',
        paddingBottom: '10px',
        textTransform:'uppercase',
        fontSize: '12px'        
      },
      passengersTextSmall:{
        textTransform:'uppercase',
        paddingBottom: '5px',
        fontSize: '9px'
      }
    });
    const Tiketino =(
      <Document>
        <Page size="B6" >
            <Image src={ticketImage} style={styles.pageBackground}/>
          <View style={styles.page}>
            <View style={styles.fullp} >
            <View style={styles.halfp}>
              <Text style={styles.tourTitle}>Meeting point:</Text>
              <Text style={styles.tourText} wrap>Main entrance of Kalemegdan park, Pariska 15</Text>
              <Text style={styles.tourText}>{ticketInfo.date}</Text>
            </View>
            <View style={styles.halfp}>
              <Text style={styles.tourTitle}>Tour date/time:</Text>
              <Text style={styles.tourText}>{ticketInfo.date}</Text>
              <Text style={styles.tourTitle}>Room number:</Text>
              <Text style={styles.tourText}>{ticketInfo.roomNumber}</Text>
            </View>
            </View>
            <View style={styles.fullp} >
              <View style={styles.halfp}>
                 <Text style={styles.passengersTitleBig}>Adults:</Text>
                 <Text style={styles.passengersTextBig}>{ticketInfo.numberOfPassengers} passengers</Text>
              </View>
              <View style={styles.halfp}>
                 <Text style={styles.passengersTitleSmall}>Kids 8-12 years:</Text>
                 <Text style={styles.passengersTextSmall}>{ticketInfo.preteens} passengers</Text>
                 <Text style={styles.passengersTitleSmall}>Kids 0-7 years:</Text>
                 <Text style={styles.passengersTextSmall}>{ticketInfo.children} passengers</Text>
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
        return <div>
          <p>bravo majmune!</p>
          <a href={url} download='ticket' >download</a><br />
          <button onClick={() => window.open(url, "_blank")}>
            open in new tab
          </button>
        </div>
      }}
    </BlobProvider>
      </div>
    </div>
  );
};

export default SuccessModal;
