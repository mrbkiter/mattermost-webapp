import React from 'react';
import {FormattedMessage} from 'react-intl';

import {recycleDatabaseConnection} from 'actions/admin_actions.jsx';
import * as Utils from 'utils/utils.jsx';
import {t} from 'utils/i18n';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import RequestButton from './request_button/request_button.jsx';
import SettingsGroup from './settings_group.jsx';
import TextSetting from './text_setting.jsx';

export default class RedisSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);
    }

    getConfigFromState(config) {
        // password + address are read-only from the UI
        config.RedisSettings.Enable = this.state.enable;
        config.RedisSettings.PoolSize = this.state.poolSize;

        return config;
    }
    
    getStateFromConfig(config) {
        return {
            enableRedisCluster: config.RedisSettings.EnableRedisCluster,
            address: config.RedisSettings.Address,
            password: config.RedisSettings.Password,
            index: config.RedisSettings.Index,
            enabled: config.RedisSettings.Enable,
            poolSize: config.RedisSettings.PoolSize
        };
    }

    renderTitle() {
        return (
            <FormattedMessage
                id='admin.redis.title'
                defaultMessage='Redis Settings'
            />
        );
    }

    renderSettings() {

        return (
            <SettingsGroup>
                <div className='banner'>
                    <FormattedMessage
                        id='admin.sql.noteDescription'
                        defaultMessage='Changing properties in this section will require a server restart before taking effect.'
                    />
                </div>
                <BooleanSetting
                    disabled={true}
                    id='redisEnable'
                    label={
                        <FormattedMessage
                            id='admin.redis.enabled'
                            defaultMessage='Enable Redis: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.redis.enableDescription'
                            defaultMessage='Enable Redis configuration which would be used for redis clustering (and redis cache in future).'
                        />
                    }
                    value={this.state.enabled}
                />
                <BooleanSetting
                    disabled={true}
                    id='redisClusterEnable'
                    label={
                        <FormattedMessage
                            id='admin.redis.enabled_cluster'
                            defaultMessage='Enable Redis Cluster: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.redis.enableRedisClusterDescription'
                            defaultMessage='Enable Redis Cluster configuration'
                        />
                    }
                    value={this.state.enableRedisCluster}
                />
                <div className='form-group'>
                    <label
                        className='control-label col-sm-4'
                        htmlFor='Address'
                    >
                        <FormattedMessage
                            id='admin.rediss.address'
                            defaultMessage='Address:'
                        />
                    </label>
                    <div className='col-sm-8'>
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.address}
                            disabled={true}
                        />
                        <div className='help-text'>
                            <FormattedMessage
                                id='admin.redis.addressDescription'
                                defaultMessage='Set the redis address in the config.json file.'
                            />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label
                        className='control-label col-sm-4'
                        htmlFor='Password'
                    >
                        <FormattedMessage
                            id='admin.redis.password'
                            defaultMessage='Password:'
                        />
                    </label>
                    <div className='col-sm-8'>
                        <input
                            type='text'
                            className='form-control'
                            value='***************'
                            disabled={true}
                        />
                        <div className='help-text'>
                            <FormattedMessage
                                id='admin.redis.passwordDescription'
                                defaultMessage='Set the redis password in the config.json file.'
                            />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label
                        className='control-label col-sm-4'
                        htmlFor='index'
                    >
                        <FormattedMessage
                            id='admin.redis.index'
                            defaultMessage='Redis db Index:'
                        />
                    </label>
                    <div className='col-sm-8'>
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.index}
                            disabled={true}
                        />
                        <div className='help-text'>
                        <FormattedMessage
                            id='admin.redis.indexDescription'
                            defaultMessage='Redis DB index. It should be less than 10'
                        />
                        </div>
                    </div>
                </div>
                <TextSetting
                    id='poolSize'
                    label={
                        <FormattedMessage
                            id='admin.redis.poolSize'
                            defaultMessage='Redis Pool Size:'
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.redis.poolSize'
                            defaultMessage='Pool Size of redis.'
                        />
                    }
                    value={this.state.poolSize}
                    onChange={this.handleChange}
                />
            </SettingsGroup>
        );
    }
}
