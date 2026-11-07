import { StyleSheet, Text, View, FlatList, SectionList } from "react-native";

const datosFlas = [
    { id: '1', nombre: 'Juan'},
    { id: '2', nombre: 'Maria'},
    { id: '3', nombre: 'Pedro'},
    { id: '4', nombre: 'Emilio'}
];

const datosSaction = [
    {
        titulo: 'Frutas',
        data: ['Manzana', 'Platano'],
    },
    {
        titulo: 'Verduras',
        data: ['Zanahoria', 'Lechuga'],
    },
];

export default function SectionListScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Ejemplo Flatlist</Text>
            <FlatList
                data={datosFlas}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Text style={styles.item}>{item.nombre}</Text>
                )}
            >   
            </FlatList>

            
            <SectionList
            sections={datosSaction}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
                <Text style={styles.item}>{item}</Text>
            )}
            renderSectionHeader={({section}) => (
                <Text style={styles.encabezado}>{section.titulo}</Text>
            )}
            >

            </SectionList>

        </View>
    )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,               
    paddingTop: 50,        
    paddingHorizontal: 20, 
    backgroundColor: '#efffc4', 
  },

  titulo: {
    fontSize: 20,          
    fontWeight: 'bold',    
    marginTop: 20,         
    marginBottom: 10,      
    textAlign: 'center',   
    color: 'black',
  },

  encabezado: {
    fontSize: 16,          
    fontWeight: 'bold',    
    backgroundColor: 'gold', 
    padding: 5, 
    color: 'white'       
  },

  item: {
    fontSize: 14,       
    padding: 10,           
    borderBottomWidth: 1,  
    borderBottomColor: '#121212', 
  },
});



