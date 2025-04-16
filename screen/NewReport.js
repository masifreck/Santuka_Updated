import { View, Text, StyleSheet,ScrollView,ActivityIndicator ,TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import NewCustomDropdown from './CustomDropDown';
import Calander from './Calender';
import { debounce } from 'lodash';
import { Table, Row, Rows } from "react-native-table-component";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { generateHTML } from './HTMLReport';
import RNPrint from "react-native-print";
import Share from 'react-native-share';
//import Calander from './components/Calander';

const NewReport = () => {

    const [ClinetName, setClinetName] = useState('');
    const [searhClient, setSearchClient] = useState('');
    const [clientData, setClientData] = useState([]);
const [Client,setClient]=useState('');
    const [MaterialName, setMaterialName] = useState('');
    const [searchMaterial, setSearchMaterial] = useState('');
    const [MaterialData, setMaterialData] = useState([]);
const [materialN,setMaterialN]=useState('')
    const [UnloadingId, setUnloadingId] = useState('');
    const [searchUnloading,setSearchUnloading]=useState('');
    const [UnloadData,setUnloadData]=useState([]);
    const [unloadingpoint,setUnloadingPoint]=useState('')

    const [LoadingId, setLoadingId] = useState('');
    const [searchLoading,setSearchLoading]=useState('');
    const [LoadingData,setLoadingData]=useState([]);
    const [loadingPoint,setLoadingPoint]=useState('');

    const [LoadDateTo, setLoadDateTo] = useState('');
    const [LoadDateFrom, setLoadDateFrom] = useState('');
    const [openLoadDateFrom, setOpenLoadDateFrom] = useState(false); 
    const [openLoadDateTo,setOpenLoadDateTo]=useState(false)
    const [filePath, setFilePath] = useState(null);
    // State for Calendar Modal
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [printpdfloading,setprintpdfloading]=useState(false)
    const printDocument = async (tableData,Client,loadingPoint,unloadingpoint,LoadDateTo,materialN) => {
        console.log("Unloading Point:", unloadingpoint);
        if (!Array.isArray(tableData) || tableData.length === 0) {
            Alert.alert("No data available to print!");
            return;
        }
    
        try {
            setprintpdfloading(true)
            const html = generateHTML(tableData,Client,loadingPoint,unloadingpoint,LoadDateTo,materialN);
            await RNPrint.print({ html });
        } catch (error) {
            console.error("Print Error:", error);
        }finally{
            setprintpdfloading(false)
        }
    };
// const printDocument=async()=>{
//     console.log('function called')
//     const testHTML = `<html><body><h1>Test Print</h1><p>Hello, this is a test.</p></body></html>`;
// await RNPrint.print({ html: testHTML });}

    const [pdfLoading, setPdfLoading] = useState(false);

    const generatePDFAndShare = async (tableData,Client,loadingPoint,unloadingpoint,LoadDateTo,materialN) => {
        try {
            setPdfLoading(true); // Show loader
            
            const result = await RNHTMLtoPDF.convert({
                html: generateHTML(tableData,Client,loadingPoint,unloadingpoint,LoadDateTo,materialN),
                fileName: `santuka`,
                directory: 'Documents',
            });
    
            setFilePath(result.filePath);
            sharePDF(result.filePath);
        } catch (error) {
            console.log('Error generating PDF:', error);
        } finally {
            setPdfLoading(false); // Hide loader
        }
    };
      const sharePDF = async (path) => {
        try {
          const shareOptions = {
            title: 'Share PDF',
            url: `file://${path}`,  // Use the file URI for the PDF
            message: 'Here is your PDF file.',
            subject: 'PDF File',
          };
    
          // Share the PDF file
          await Share.open(shareOptions);
          console.log('Share success');
        } catch (error) {
          console.log('Error sharing PDF:', error);
         
        }
      };
      const Validation = () => {
        if (!ClinetName) {
          Alert.alert('Error', 'Client Name is Required');
          return false;
        } else if (!loadingPoint) {
          Alert.alert('Error', 'Loading Point is Required');
          return false;
        } else if (!LoadDateTo) {
          Alert.alert('Error', 'Load Date is Required');
          return false;
        }
      
        return true;
      };
      
    const fetchData = async () => {
if(!Validation()){
    return
}
 setLoading(true);
        const formattedLoadDateFrom = LoadDateFrom ? formatDate(LoadDateFrom) : "";
        const formattedLoadDateTo = LoadDateTo ? formatDate(LoadDateTo) : "";
        setError(null);
        //console.log("Fetching data started...");
        try {
            const url = `https://mis.santukatransport.in/API/Test/GetLoadingChalla?ClientId=${ClinetName}&MaterialId=${MaterialName}
                &LoadDateFrom=${formattedLoadDateFrom}&LoadDateTo=${formattedLoadDateTo}
                &LoadingId=${LoadingId}&UnloadingId=${UnloadingId}`;
                
            console.log("Request URL:", url);
   
            const response = await fetch(url);
            
            console.log("Response status:", response);
    
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
    
            const result = await response.json();
           // console.log("Fetched data:", result);
    
            if (!result.data || result.data.length === 0) {
                throw new Error("No data available");
            }
    
            setData(result.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
            console.log("Fetching data finished.");
        }
    };
    

    function formatDate(date) {
        if (!date) return '';
        
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure two-digit format
        const day = String(d.getDate()).padStart(2, '0'); // Ensure two-digit format
        
        return `${day}-${month}-${year}`;
    }
    

    function ConvertedDate(date) {
        if (!date) return '';
        const formattedDate = new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
        return formattedDate.split("/").reverse().join("-");
    }

    useEffect(() => {
        const fetchMaterialData = async () => {
            if (!searchMaterial.trim()) return;
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetMaterialName?MaterialName=${searchMaterial}`
                );
                const result = await response.json();
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.MaterialId,
                        label: item.MaterialName,
                    }));
                    setMaterialData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching material data:", error);
            }
        };

        const debouncedFetch = debounce(fetchMaterialData, 5); // ⏳ Wait for 500ms before calling API
        debouncedFetch();
    
        return () => debouncedFetch.cancel()
    }, [searchMaterial]);

    useEffect(() => {
        const fetchClientData = async () => {
            if (!searhClient.trim()) return;
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetClientDetails?ClinetName=${searhClient}`
                );
                const result = await response.json();
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.ClientId,
                        label: item.ClinetName,
                    }));
                    setClientData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };
        const debouncedFetch = debounce(fetchClientData, 500); // ⏳ Wait for 500ms before calling API
        debouncedFetch();
    
        return () => debouncedFetch.cancel()
    }, [searhClient]);

    useEffect(() => {
        const fetchLoadingData = async () => {
            if (!searchLoading.trim()) return; // ❌ Don't fetch if empty
    
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetLoadingPoints?Loading=${searchLoading}`
                );
                const result = await response.json();
                
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.LoadingId,
                        label: item.Loading,
                    }));
                    setLoadingData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching loading data:", error);
            }
        };
    
        const debouncedFetch = debounce(fetchLoadingData, 500); // ⏳ Wait for 500ms before calling API
        debouncedFetch();
    
        return () => debouncedFetch.cancel(); // 🛑 Cleanup on unmount or new input
    }, [searchLoading]);
    
    const handleSearch = (text) => {
        setSearchLoading(text); // ✅ Update search query
    };

    useEffect(() => {
        const fetchUnloadingData = async () => {
            if (!searchUnloading.trim()) return;
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetUnloadingPoints?Unloading=${searchUnloading}`
                );
                const result = await response.json();
               
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.UnloadingId,
                        label: item.Unloading,
                    }));
                    setUnloadData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        const debouncedFetch = debounce(fetchUnloadingData, 500); // ⏳ Wait for 500ms before calling API
        debouncedFetch();
    
        return () => debouncedFetch.cancel()
    }, [searchUnloading]);
    const tableHead = ["Truck No","Challan No", "TP","Material Name", "Loading MT./Pkts", "Unloading MT./Pkts", "Unloaded Date", "Cash Adv", "Bank Transfer", "UPI Amount","HSD Adv", "Pump Name","MemoNo","Remarks"];

    // Table Data (Convert object to array of values)
   
    const tableData = data.map((item) => [
         item.TruckNumber || "",
        item.ChallanNo || "",
        item.TP || "",
      
        item.MaterialName || "",
        item.NetWT ? Number(item.NetWT).toFixed(3) : "", // 3 decimal places
        item.UnloadedNetWt ? Number(item.UnloadedNetWt).toFixed(3) : "",
        item.UnloadedDate || "",
        !isNaN(parseFloat(item.Advance)) ? parseFloat(item.Advance).toFixed(2) : "",
        !isNaN(parseFloat(item.BankTransfer)) ? parseFloat(item.BankTransfer).toFixed(2) : "",
        !isNaN(parseFloat(item.upi)) ? parseFloat(item.upi).toFixed(2) : "",
        !isNaN(parseFloat(item.HSDCost)) ? parseFloat(item.HSDCost).toFixed(2) : "",
        item.PumpName && item.PumpName.trim() !== "" ? item.PumpName : "", // Default to 'N/A' if empty
        item.MemoNo || "",
        item.Remarks || "",
    ]);
    
    // console.log("Formatted Table Data:", tableData); // Debugging log
    useEffect(()=>{
console.log('updated search',searchLoading)
    },[searchLoading])
    useEffect(()=>{
        const fetchMaterialData = async () => {
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetMaterialName?MaterialName=${searchMaterial}`
                );
                const result = await response.json();
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.MaterialId,
                        label: item.MaterialName,
                    }));
                    setMaterialData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching material data:", error);
            }
        };
        const fetchUnloadingData = async () => {
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetUnloadingPoints?Unloading=${searchUnloading}`
                );
                const result = await response.json();
               
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.UnloadingId,
                        label: item.Unloading,
                    }));
                    setUnloadData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };
        const fetchClientData = async () => {
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetClientDetails?ClinetName=${searhClient}`
                );
                const result = await response.json();
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.ClientId,
                        label: item.ClinetName,
                    }));
                    setClientData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };
        const fetchLoadingData = async () => {
          
    
            try {
                const response = await fetch(
                    `https://mis.santukatransport.in/API/Test/GetLoadingPoints?Loading=${searchLoading}`
                );
                const result = await response.json();
                
                if (result.data) {
                    const mappedData = result.data.map((item) => ({
                        value: item.LoadingId,
                        label: item.Loading,
                    }));
                    setLoadingData(mappedData);
                }
            } catch (error) {
                console.error("Error fetching loading data:", error);
            }
        };
        fetchLoadingData()
        fetchClientData()
        fetchUnloadingData()
        fetchMaterialData()
    },[])
    return (
        <ScrollView style={{flex:1,backgroundColor:'white',marginLeft:'auto',marginRight:'auto',marginTop:10,paddingVertical:10,borderRadius:10}}> 
            {/* <Text>NewReport</Text> */}

            <NewCustomDropdown
                labelText="Client Name"
                isMandatory={true}
                dropData={clientData}
                placeholdername="Select Client"
                showSearch={true}
                value={ClinetName}
                isEdit={true}
                onChange={(item) => {
                    setClinetName(item.value);
                    setClient(item.label);
                    
                }}
                onChangeText={(t) => setSearchClient(t)}
            />

            <NewCustomDropdown
                labelText="Material Name"
                isMandatory={false}
                dropData={MaterialData}
                placeholdername="Select Material"
                showSearch={true}
                value={MaterialName}
                isEdit={true}
                onChange={(item) => {
                    setMaterialName(item.value);
                    setMaterialN(item.label)
                }}
                onChangeText={(t) => setSearchMaterial(t)}
            />
   <NewCustomDropdown
  labelText="Loading Point"
  isMandatory={true}
  dropData={LoadingData}
  placeholdername="Select Loading"
  showSearch={true}
  value={LoadingId}
  isEdit={true}
  onChange={(item) => {
    setLoadingId(item.value);
    setSearchLoading(searchLoading); // Keep search text after selection
    setLoadingPoint(item.label);
  }}
  onChangeText={(text) => {
    console.log('Search text:', text);
    setSearchLoading(text); // Ensure search text updates in parent
  }}
/>


              <NewCustomDropdown
                labelText="Unloading Point"
                isMandatory={false}
                dropData={UnloadData}
                placeholdername="Select Unloading"
                showSearch={true}
                value={UnloadingId}
                isEdit={true}
                onChange={(item) => {
                    setUnloadingId(item.value);
                   setUnloadingPoint(item.label)
                }}
                onChangeText={(t) => setSearchUnloading(t)}
            />
                   <Calander
    isEvalidate={false}
    isMandatory={true}
    labelname="Load Date"
    valueDate={LoadDateTo ? formatDate(LoadDateTo) : ""}
    date={LoadDateTo || new Date()} // Ensure it's always a valid date
    open={openLoadDateTo}
    onConfirm={(date) => {
        setOpenLoadDateTo(false);
        setLoadDateTo(date);
    }}
    onCancel={() => setOpenLoadDateTo(false)}
    onPress={() => setOpenLoadDateTo(true)}
/>
{/* <Calander
    isEvalidate={false}
    labelname="Load Date From"
    valueDate={LoadDateFrom ? formatDate(LoadDateFrom) : ''} // Ensure it's always a formatted string
    date={LoadDateFrom || new Date()} // Keep as a Date object
    open={openLoadDateFrom}
    onConfirm={(date) => {
        setOpenLoadDateFrom(false);
        setLoadDateFrom(date); // Store as Date
    }}
    onCancel={() => setOpenLoadDateFrom(false)}
    onPress={() => setOpenLoadDateFrom(true)}
/> */}
<View style={{flexDirection:'row',margin:10,gap:10,alignSelf:'center'}}>


     
</View>
<TouchableOpacity style={styles.Submit} onPress={fetchData}>
    <Text style={styles.buttonText}>GET REPORT</Text>
</TouchableOpacity>
{loading && <ActivityIndicator size="large" color="#2E5090" />}
            {error && <Text style={styles.error}>{error}</Text>}

            {!loading && !error && data.length > 0 && (
                <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }} >
                    <ScrollView style={styles.scrollView}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc" }}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={[100,110, 110, 120, 100, 100, 100, 100, 100, 100,100, 100,100,100]} />
                            <Rows data={tableData} textStyle={styles.text} widthArr={[100, 110,110, 120, 100, 100, 100, 100, 100, 100, 100,100,100,100]} />
                        </Table>
                    </ScrollView>
                   
                </ScrollView>
            
            )}
             <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>
             <TouchableOpacity 
  style={styles.printbtn} 
  onPress={() => generatePDFAndShare(data, Client, loadingPoint, unloadingpoint, LoadDateTo, materialN)}
  disabled={pdfLoading} // Optional: Disable button while loading
>
  {pdfLoading ? (
    <ActivityIndicator size="small" color="#ffffff" />
  ) : (
    <Text style={styles.buttonText}>Share Report</Text>
  )}
</TouchableOpacity>

<TouchableOpacity 
  style={styles.printbtn} 
  onPress={() => printDocument(data, Client, loadingPoint, unloadingpoint, LoadDateTo, materialN)}
>
  <Text style={styles.buttonText}>Print Report</Text>
</TouchableOpacity>

                    </View>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 10 },
    dateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    Submit: {width:'90%', backgroundColor: '#2E5090', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 ,marginLeft:'auto',marginRight:'auto'},
    printbtn: {width:130, backgroundColor: '#2E5090', padding: 15, borderRadius: 5, alignItems: 'center', marginVertical: 10 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    scrollContainer: { marginTop: 10,marginHorizontal:20 ,maxWidth:1500,minWidth:1000},
    verticalScroll: { maxHeight: 500 },
    scrollView: {
        marginTop: 10,
    },
    head: {
        height: 50,
        backgroundColor: "#2E5090",
    },
    headText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
    text: {
        textAlign: "center",
        padding: 8,
        color:'gray',fontSize:12
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    noData: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginTop: 20,
    },
});
export default NewReport;
