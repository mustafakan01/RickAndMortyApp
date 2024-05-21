import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Pagination = ({ page, setPage }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Previous"
        onPress={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      />
      <Text style={styles.pageText}>{page}</Text>
      <Button title="Next" onPress={() => setPage(page + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  pageText: {
    fontSize: 16,
  },
});

export default Pagination;
