import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useStyle } from './styles';

export const PowerBiDashboard = ({
  accessToken,
  filters,
  slicers,
  reportData,
}) => {
  const classes = useStyle();

  return (
    <PowerBIEmbed
      cssClassName={classes.container}
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual and qna
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportData?.reportId}&groupId=${reportData?.groupId}`,
        accessToken,
        viewMode: models.ViewMode.View,
        tokenType: models.TokenType.Embed,
        filters,
        slicers,
        pageName: reportData?.defaultPage,
        settings: {
          layoutType: models.LayoutType.Custom,
          customLayout: {
            displayOption: models.DisplayOption.FitToWidth,
          },
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          localeSettings: {
            language: 'pt',
            formatLocale: 'pt-BR',
          },
          panes: {
            pageNavigation: {
              visible: reportData?.pageNavigation,
            },
          },
        },
      }}
    />
  );
};
export default PowerBiDashboard;
