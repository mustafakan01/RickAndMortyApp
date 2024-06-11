import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePrevPage} disabled={currentPage === 1}>
        <Text style={styles.buttonText}>Önceki</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNextPage} disabled={currentPage === totalPages}>
        <Text style={styles.buttonText}>Sonraki</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pagination;
