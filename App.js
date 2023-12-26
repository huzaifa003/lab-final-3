import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { db } from './db';
import { set, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import worldRanking from './worldranking';

export default function App() {
  const [rankingData, setRankingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    get(ref(db, 'rankings'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRankingData(snapshot.val());
          setFilteredData(snapshot.val());
        } else {
          for (let i = 0; i < rankingData.length; i++) {
            set(ref(db, `rankingData/${i}`), rankingData[i]);
          }
          setRankingData(worldRanking);
          setFilteredData(worldRanking);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = collegesData.filter((item) =>
      item.ranking_institution_title.toLowerCase().includes(text.toLowerCase()) ||
      String(item.rank).toLowerCase().includes(text.toLowerCase()) ||
      String(item.location).toLowerCase().includes(text.toLowerCase()) ||
      String(item.research_environment).toLowerCase().includes(text.toLowerCase()) ||
      String(item.teaching_score).toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Institution Data</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.ranking_institution_title}</Text>
            <Text style={styles.score}>{item.rank}</Text>
            <Text style={styles.seat}>{item.location}</Text>
            <Text style={styles.numeric}>Research Environemnt : {item.research_environment}</Text>
            <Text style={styles.numeric}>Teaching Score: {item.teaching_score}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    margin: 10
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  score: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  seat: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  numeric: {
    fontSize: 14,
    color: '#555',
  },
});
