import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  ButtonBase,
  Collapse,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IconButton } from '../Buttons/IconButton';
import { Divider } from '../Divider/Divider';
import { resolveData } from './tableFunctions';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  size: {
    height: '1.5em',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));

export const TableCard = ({
  clearCache,
  updateList,
  data,
  columns,
  onRowClick,
  rowId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hiddenColumn, setHiddenColumn] = useState([]);
  const [visibleColumn, setVisibleColumn] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setHiddenColumn(
      columns.filter(({ options = {} }) => {
        const { visible = true } = options;
        const { hiddenCard = false } = options;
        return visible && hiddenCard;
      })
    );

    setVisibleColumn(
      columns.filter(({ options = {} }) => {
        const { visible = true } = options;
        const { hiddenCard = false } = options;
        return visible && !hiddenCard;
      })
    );
  }, [columns, setHiddenColumn, setVisibleColumn]);

  return (
    <Card square className={classes.card} key={rowId}>
      <ButtonBase
        centerRipple
        className={classes.cardAction}
        onClick={() => onRowClick(data)}
      >
        <CardHeader
          action={
            <IconButton aria-label="actions">
              <Icon path={mdiDotsVertical} size={1} />
            </IconButton>
          }
        />
        <CardContent>
          <Grid spacing={2} container>
            {visibleColumn.map(({ field, customRender }) => (
              <Grid item sm={12}>
                {field}
                {customRender ? customRender(data) : resolveData(field, data)}
              </Grid>
            ))}
            <Collapse
              in={expanded}
              timeout="auto"
              onEntered={updateList}
              onExited={() => {
                updateList();
              }}
            >
              {hiddenColumn.map(({ field, customRender }) => (
                <Grid item sm={12}>
                  {field}
                  {customRender ? customRender(data) : resolveData(field, data)}
                </Grid>
              ))}
            </Collapse>
          </Grid>
        </CardContent>

        <Divider variant="solid" />

        <CardActions style={{ padding: 'unset' }}>
          <IconButton
            onClick={() => {
              clearCache();
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
            />
            <Typography variant="button" color="textPrimary">
              {expanded ? 'MOSTRAR MENOS' : 'MOSTRAR MAIS'}
            </Typography>
          </IconButton>
        </CardActions>
      </ButtonBase>
    </Card>
  );
};

export default TableCard;
