import React, { useState } from 'react';
import {
  Card as CardMUI,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Drawer,
  Grid,
  List,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isNotEmptyOrNull } from '@tecsinapse/es-utils/build';

import { Divider, IconButton } from '@tecsinapse/ui-kit';
import { resolveData } from '../../utils/tableFunctions';
import { getActionButtons } from '../../Rows/RowActions/RowActions';

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
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

const CardColumn = ({
  title,
  customRender,
  data,
  field,
  tableHeaderHide,
  classes,
}) => (
  <div key={field}>
    {!tableHeaderHide && (
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
    )}
    <div>
      {customRender && data ? (
        customRender(data)
      ) : (
        <Typography
          variant="subtitle2"
          color="textPrimary"
          className={tableHeaderHide ? classes.marginTop : ''}
        >
          {resolveData(field, data)}
        </Typography>
      )}
    </div>
  </div>
);

export const Card = ({
  clearCache,
  updateList,
  data,
  columns,
  onRowClick,
  actions,
  rowId,
  labelShowLess,
  labelShowMore,
  tableHeaderHide,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const classes = useStyles();

  const paddingUnset = { padding: 'unset' };

  return (
    <CardMUI square className={classes.card} key={rowId}>
      <CardActionArea
        disableRipple
        onClick={() => (onRowClick ? onRowClick(data) : null)}
      >
        <CardContent>
          <Grid spacing={1} direction="column" container>
            {columns.map(
              ({ title, field, customRender, options = {} }, index) => {
                const { visible = true } = options;
                const { hiddenCard = false } = options;

                if (hiddenCard || !visible) {
                  return null;
                }
                const displayFlex = { display: 'flex' };
                const flex1Auto = {
                  flex: '1 1 auto',
                };
                const flex0AutoStart = {
                  flex: '0 0 auto',
                  alignSelf: 'flex-start',
                };
                const marginNegative = {
                  marginRight: '-8px',
                  marginTop: '-8px',
                };

                return (
                  <Grid item xs={12} key={field}>
                    <div style={displayFlex}>
                      <div style={flex1Auto}>
                        <CardColumn
                          title={title}
                          customRender={customRender}
                          data={data}
                          field={field}
                          tableHeaderHide={tableHeaderHide}
                          classes={classes}
                        />
                      </div>
                      {index === 0 && isNotEmptyOrNull(actions) && (
                        <>
                          <div style={flex0AutoStart}>
                            <IconButton
                              aria-label="actions"
                              style={marginNegative}
                              onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                setOpenActions(true);
                              }}
                            >
                              <Icon path={mdiDotsVertical} size={1} />
                            </IconButton>
                          </div>
                          <Drawer
                            anchor="bottom"
                            open={openActions}
                            onClose={e => {
                              e.stopPropagation();
                              e.preventDefault();
                              setOpenActions(false);
                            }}
                          >
                            <List disablePadding>
                              {getActionButtons(actions, true, data)}
                            </List>
                          </Drawer>
                        </>
                      )}
                    </div>
                  </Grid>
                );
              }
            )}
          </Grid>

          <Collapse
            className={classes.marginTop}
            in={expanded}
            timeout="auto"
            onEntered={updateList}
            onExited={() => {
              updateList();
            }}
          >
            <Grid spacing={1} direction="column" container>
              {columns.map(({ title, field, customRender, options = {} }) => {
                const { visible = true } = options;
                const { hiddenCard = false } = options;

                if (!hiddenCard || !visible) {
                  return null;
                }

                if (!isHidden) {
                  setIsHidden(true);
                }

                return (
                  <Grid item xs={12} key={field}>
                    <CardColumn
                      title={title}
                      customRender={customRender}
                      data={data}
                      field={field}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Collapse>
        </CardContent>
      </CardActionArea>

      {isHidden && (
        <>
          <Divider variant="solid" />
          <CardActions style={paddingUnset}>
            <IconButton
              onClick={() => {
                clearCache();
                setExpanded(!expanded);
              }}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon
                color="primary"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              />
              <Typography variant="button" color="textPrimary">
                {expanded ? labelShowLess : labelShowMore}
              </Typography>
            </IconButton>
          </CardActions>
        </>
      )}
    </CardMUI>
  );
};

export default Card;
