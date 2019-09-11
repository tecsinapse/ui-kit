import { useEffect } from 'react';
import { applyHeaderFilters, isRemoteData } from './tableFunctions';

export const useInitialData = (originalData, setData) => {
  useEffect(() => {
    if (!isRemoteData(originalData)) {
      setData([...originalData]);
    }
  }, [originalData, setData]);
};
export const useInitialCheckboxData = (selectedData, setSelectedRows) => {
  useEffect(() => {
    if (selectedData) {
      setSelectedRows(selectedData);
    }
  }, [selectedData, setSelectedRows]);
};

export const useUpdateDataRemote = (
  originalData,
  setLoading,
  setData,
  filters,
  setTotalCount,
  mobile
) => {
  useEffect(() => {
    if (isRemoteData(originalData)) {
      setLoading(true);
      originalData(filters).then(({ data: resultData, totalCount }) => {
        setData(prevData => {
          if (!mobile || !filters.loadedResolver) {
            return [...resultData];
          }
          // Replace old array with received array according its position
          return prevData
            .slice(0, filters.startIndex)
            .concat(resultData, prevData.slice(filters.stopIndex + 1));
        });
        setTotalCount(totalCount);

        // Warns the infinity mobile loader list that the new data has been retrieved
        if (mobile && filters.loadedResolver) {
          filters.loadedResolver();
        }

        setLoading(false);
      });
    }
  }, [filters, originalData, setLoading, mobile, setTotalCount, setData]);
};

export const useUpdateDataProp = (
  originalData,
  setLoading,
  setData,
  { headerFilters, ascending, sortField, sortFunc },
  setTotalCount
) => {
  useEffect(() => {
    if (!isRemoteData(originalData)) {
      setLoading(true);
      const filteredData = applyHeaderFilters(
        originalData,
        headerFilters,
        ascending,
        sortField,
        sortFunc
      );
      setTotalCount(filteredData.length);
      setData(filteredData);
      setLoading(false);
    }
  }, [
    headerFilters,
    ascending,
    sortField,
    originalData,
    setLoading,
    setTotalCount,
    setData,
    sortFunc,
  ]);
};

export const useUpdatePageData = (
  isRemote,
  data,
  setPageData,
  { page, rowsPerPage }
) => {
  useEffect(() => {
    if (isRemote || !rowsPerPage || rowsPerPage === 0) {
      setPageData(data);
    } else {
      setPageData(
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [data, isRemote, page, rowsPerPage, setPageData]);
};
