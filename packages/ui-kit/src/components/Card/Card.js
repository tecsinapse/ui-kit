import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Grid,
  Typography,
  CardActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCardUiKitStyles } from './customStyles';

export const Card = ({
  style,
  styleCard,
  onClick,
  title,
  subtitle,
  content,
  subContent,
  actions,
  onLoad,
}) => {
  const classes = useCardUiKitStyles();

  return (
    <div style={style}>
      <MuiCard className={classes.card} style={styleCard} onLoad={onLoad}>
        <CardContent className={classes.cardContent} onClick={onClick}>
          <Grid container classes={{ root: classes.gridContainer }}>
            <Grid item xs={12} classes={{ root: classes.grid }}>
              <div className={classes.gridFlex}>
                {title && title.name && (
                  <Typography classes={{ root: classes.title }}>
                    {title.name}
                  </Typography>
                )}
                {title.components}
              </div>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.grid }}>
              <Typography
                classes={{ root: classes.subTitle }}
                style={{ color: styleCard.customSubtitleColor }}
              >
                {subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.grid }}>
              <Typography
                variant="caption"
                classes={{
                  root: classes.content,
                }}
              >
                {content}
              </Typography>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.grid }}>
              {subContent}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          classes={{
            root: classes.actions,
          }}
        >
          {actions}
        </CardActions>
      </MuiCard>
    </div>
  );
};

Card.propTypes = {
  /** Style for root div */
  style: PropTypes.object,
  /** Style for card */
  styleCard: PropTypes.shape({
    customSubtitleColor: PropTypes.string,
    border: PropTypes.string,
    boxShadow: PropTypes.string,
    borderLeft: PropTypes.string,
  }),
  /** Card onClick event handler */
  onClick: PropTypes.func,
  /** Card title and components */
  title: PropTypes.shape({
    name: PropTypes.node,
    components: PropTypes.node,
  }),
  /** Card subtitle */
  subtitle: PropTypes.string,
  /** Card content */
  content: PropTypes.node,

  /** Card extra content */
  subContent: PropTypes.node,
  /** Components to be rendered as card actions */
  actions: PropTypes.node,
  /** Function to be rendered on load */
  onLoad: PropTypes.func,
};

Card.defaultProps = {
  styleCard: {
    customSubtitleColor: '',
  },
};

export default Card;
