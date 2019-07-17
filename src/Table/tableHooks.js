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

export const useUpdateData = (
  data,
  setLoading,
  setData,
  filters,
  setTotalCount
) => {
  useEffect(() => {
    setLoading(true);

    if (isRemoteData(data)) {
      data(filters).then(({ data: resultData, totalCount }) => {
        setTotalCount(totalCount);
        setData([...resultData]);
        setLoading(false);
      });
    } else {
      const filteredData = applyHeaderFilters(data, filters);
      setTotalCount(filteredData.length);
      setData(filteredData);
      setLoading(false);
    }
  }, [filters, data, setLoading, setTotalCount, setData]);
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
