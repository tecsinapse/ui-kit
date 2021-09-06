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
  page,
  rowsPerPage,
  setTotalCount,
  mobile
) => {
  useEffect(() => {
    if (isRemoteData(originalData)) {
      setLoading(true);
      originalData({ ...filters, page, rowsPerPage }).then(
        ({ data: resultData, totalCount }) => {
          setData(prevData => {
            if (!mobile || !filters.loadedResolver) {
              return [...resultData];
            }

            return prevData.slice(0, filters.startIndex).concat(resultData);
          });
          setTotalCount(totalCount);

          // Warns the infinity mobile loader list that the new data has been retrieved
          if (mobile && filters.loadedResolver) {
            filters.loadedResolver();
          }

          setLoading(false);
        }
      );
    }
  }, [
    filters,
    originalData,
    setLoading,
    mobile,
    setTotalCount,
    setData,
    page,
    rowsPerPage,
  ]);
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
  page,
  rowsPerPage
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
