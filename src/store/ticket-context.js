import {
    BlobProvider,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
  } from "@react-pdf/renderer";



    
export function ticketInfoHandler(tourInfo,ticketInfo) {
        let blobecanje = {
            blob:null,
            url:null,
        }
        const styles = StyleSheet.create({
        page: {
          backgroundColor: "yellow",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      });
      const Ticket =(
        <Document>
          <Page size="A6" style={styles.page}>
            <View>
              <Text>{tourInfo.boat}</Text>
              <Text>{tourInfo.date}</Text>
              <Text>{ticketInfo.numberOfPassengers} putnika</Text>
            </View>
          </Page>
        </Document>
      );

    <BlobProvider document={Ticket}>
      {({ blob, url, loading, error }) => 
        {blobecanje = {
            ...blobecanje,
            blob:blob,
            url:url
            }
        return '23console.log(blobecanje)'}
      }
    </BlobProvider>
    return 'object'
  }
