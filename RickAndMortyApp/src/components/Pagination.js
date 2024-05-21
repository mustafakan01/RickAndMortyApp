import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Pagination = ({ page, setPage }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Previous"
        onPress={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
      />
      <Button
        title="Next"
        onPress={() => setPage(prevPage => prevPage + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default Pagination;
