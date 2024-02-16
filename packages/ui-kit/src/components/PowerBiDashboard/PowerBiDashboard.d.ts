import { FC } from 'react';

export interface PowerBiDashboardProps {
  accessToken: string
  filters: [object] | null;
  slicers: [object] | null;
  reportData: object
}

declare const PowerBiDashboard: FC<PowerBiDashboardProps>

export default PowerBiDashboard;
