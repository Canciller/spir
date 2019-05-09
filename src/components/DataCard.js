import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AlertDialog from './AlertDialog';
import Loading from './Loading';

const styles = theme => ({
    root: {
        flex: 1,
        minWidth: 300
    },
    card: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: theme.palette.divider,
    },
    cardMedia: {
        objectFit: 'cover'
    },
    cardActionArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    cardContent: {
        position: 'relative',
        flex: 1
    },
    cardAbsoluteContent: {
        position: 'absolute',
        top: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        zIndex: 1000
    },
    cardActions: {
        borderTop: '1px solid',
        borderColor: theme.palette.divider
    },
    dividerTop: {
        marginTop: theme.spacing.unit
    },
    dividerBottom: {
        marginBottom: theme.spacing.unit / 2
    },
});

class DataCard extends Component {
    state = {}

    onClick = e => {
        const { onClick, data } = this.props;
        if(onClick instanceof Function) onClick(e, data);
    }

    createCardActions = () => {
        const propActions = this.props.actions;
        if(!propActions) return undefined;

        let actions = [];

        for(let i = 0; i < propActions.length; ++i) {
            const {
                name,
                callback,
                ...other
            } = propActions[i];

            if(name)
                actions.push(
                    <Button
                        onClick={ e => {
                            if(callback instanceof Function) callback(e);
                        } }
                        {...other}
                        key={i}
                        size='small'
                        color='primary'
                    >
                        {name}
                    </Button>
                )
        }

        return actions;
    }

    createCardField = (props, key, value) => {
        props = props || {};

        const {
            label,
            ...other
        } = props;

        return (
            <Typography
                {...props}
                key={key}
            >
                {label &&
                        label + ': '
                }
                {value}
            </Typography>
        )
    }

    createCardDivider = (props, key, value) => {
        props = props || {};

        const { classes } = this.props;

        let {
            label,
            gutterTop,
            gutterBottom,
            ...other
        } = props;

        if(gutterBottom === undefined)
            gutterBottom = true;

        if(label === undefined)
            return ( <Fragment /> )
        else
            return (
                <Fragment
                    key={key}
                >
                    <Typography
                        {...other}
                        className={classNames(gutterTop && classes.dividerTop)}
                    >
                        {label}
                    </Typography>
                    <Divider
                        className={classNames(gutterBottom && classes.dividerBottom)}
                    />
                </Fragment>
            )
    }

    createCardContentRecursive = (contents, format, data, rootKey) => {
        format = format || {};

        let {
            contentFormatted,
            contentUnformatted
        } = contents;

        for(const key in data) {
            const completeKey = rootKey ? rootKey + '.' + key : key;

            let value = data[key],
                props = format[key] ? format[key].format : undefined,
                index = format[key] ? format[key].index : undefined;

            if(value instanceof Object || data instanceof Array) {
                const divider = this.createCardDivider(format[key], completeKey, value);

                const contentsInner = this.createCardContentRecursive({
                    contentFormatted: [],
                    contentUnformatted: []
                }, props, value, completeKey);

                const contents = (
                    <Fragment key={completeKey}>
                        {divider}
                        {contentsInner.contentFormatted}
                        {contentsInner.contentUnformatted}
                    </Fragment>
                )

                if(index !== undefined)
                    contentFormatted[index] = contents;
                else
                    contentUnformatted.push(contents);
            }
            else {
                const field = this.createCardField(format[key], completeKey, value);

                if(index !== undefined)
                    contentFormatted[index] = field;
                else
                    contentUnformatted.push(field);
            }
        }

        return contents;
    }

    generateFormatIndexes = (format, index = 0) => {
        for(const key in format) {
            let value = format[key];

            value.index = index;
            index += 1;

            if(value.format !== undefined)
                this.generateFormatIndexes(value.format);
        }

        return index;
    }

    concatContentRecursive = (array, newArray = []) => {
        for(const i in array) {
            if(array[i] instanceof Array)
                this.concatContentRecursive(array[i], newArray);
            else
                newArray.push(array[i]);
        }

        return newArray;
    }

    createCardContent = () => {
        let {
            data,
            format,
            label
        } = this.props;

        if(data === undefined) return undefined;

        const totalIndexes = this.generateFormatIndexes(format);

        let contents = {
            contentFormatted: new Array(totalIndexes),
            contentUnformatted: []
        }

        this.createCardContentRecursive(contents, format, data);

        let content = this.concatContentRecursive(contents.contentFormatted);
        content = content.concat(this.concatContentRecursive(contents.contentUnformatted));

        return content;
    }

    load = props => {
        if(!(props instanceof Object)) return;

        const loading = props.data === undefined,
              empty = loading ? true : Object.keys(props.data).length === 0;

        this.setState({
            loading,
            empty
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps != this.props)
            this.load(nextProps);
    }

    componentDidMount() {
        this.load(this.props);
    }

    render() {
        const {
            children,
            absolute,
            title,
            image,
            classes
        } = this.props;

        let actions = this.createCardActions(),
            content = this.createCardContent();

        if(this.state.loading)
            content = (
                <Loading
                    progress={{
                        size: 60
                    }}
                />
            )
        else if(this.state.empty)
            return ( <Fragment /> )

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardActionArea
                        className={classes.cardActionArea}
                        onClick={this.onClick}>
                        {image &&
                            <CardMedia
                                component="img"
                                alt={title}
                                className={classes.cardMedia}
                                height='140'
                                image={image}
                                title={title}
                            />
                        }
                        <CardContent className={classes.cardContent}>
                            {content}
                            {children}
                            <div className={classes.cardAbsoluteContent}>
                                {absolute}
                            </div>
                        </CardContent>
                    </CardActionArea>
                    {actions &&
                            <CardActions className={classes.cardActions}>
                                {actions}
                            </CardActions>
                    }
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(DataCard);
