import React from 'react';
import { Button, View } from 'react-native';

const Pagination = ({ currentPage, setPage }) => {
  return (
    <View>
      <Button title="Önceki" onPress={() => setPage(currentPage - 1)} disabled={currentPage === 1} />
      <Button title="Sonraki" onPress={() => setPage(currentPage + 1)} />
    </View>
  );
};

export default Pagination;
