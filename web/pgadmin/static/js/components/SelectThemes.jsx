import React, { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import gettext from 'sources/gettext';

import {InputSelect } from './FormComponents';
import CustomPropTypes from '../custom_prop_types';

const useStyles = makeStyles(() => ({
  preview: {
    paddingTop: 10
  }
}));

export default function SelectThemes({onChange, ...props}) {
  const classes = useStyles();
  const [previewSrc, setPreviewSrc] = useState(null);

  const themeChange = (e) => {
    props.options.forEach((opt)=> {
      if(opt.value == e) {
        setPreviewSrc(opt.preview_src);
      }
    });
    onChange(e);
  };

  return (
    <Grid
      container
      direction="column"
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <InputSelect
          ref={props.inputRef}
          onChange={themeChange}
          {...props}
        />
      </Grid>
      <Grid
        item
        lg={12} md={12} sm={12} xs={12}
        className={classes.preview}
      >
        <img
          className='img-fluid mx-auto d-block'
          src={previewSrc}
          alt={gettext('Preview not available...')}
        />
      </Grid>
    </Grid>
  );
}

SelectThemes.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  controlProps: PropTypes.object,
  fields: PropTypes.array,
  options: PropTypes.array,
  inputRef: CustomPropTypes.ref
};
