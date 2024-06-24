import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
        placeholderTextColor="grey"
        searchIcon={{ color: "grey" }}
        clearIcon={{ color: "grey" }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 5,
    borderBlockStartColor: "white",
    borderBottomWidth: 0,
    paddingHorizontal: 12,
  },
  inputContainer: {
    backgroundColor: '#e9e9e9',
    borderRadius: 25, 
    height: 50, 
  },
});

