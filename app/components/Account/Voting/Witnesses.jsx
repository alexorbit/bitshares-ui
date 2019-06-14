import React, {Component} from "react";
import Immutable from "immutable";
import Translate from "react-translate-component";
import accountUtils from "common/account_utils";
import {ChainStore, FetchChainObjects} from "bitsharesjs";
import WorkersList from "../WorkersList";
import VotingAccountsList from "../VotingAccountsList";
import cnames from "classnames";
import {Tabs, Tab} from "../../Utility/Tabs";
import BindToChainState from "../../Utility/BindToChainState";
import ChainTypes from "../../Utility/ChainTypes";
import {Link} from "react-router-dom";
import ApplicationApi from "api/ApplicationApi";
import AccountSelector from "../AccountSelector";
import Icon from "../../Icon/Icon";
import AssetName from "../../Utility/AssetName";
import counterpart from "counterpart";
import {EquivalentValueComponent} from "../../Utility/EquivalentValueComponent";
import FormattedAsset from "../../Utility/FormattedAsset";
import SettingsStore from "stores/SettingsStore";
import {
    Switch,
    Tooltip,
    Row,
    Col,
    Radio,
    Input,
    Icon as AntIcon,
    Button
} from "bitshares-ui-style-guide";
import AccountStore from "stores/AccountStore";
import JoinWitnessesModal from "../../Modal/JoinWitnessesModal";

export default class Witnesses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateWitnessModal: false
        };
    }

    render() {
        const showWitnessModal = () => {
            this.setState({
                showCreateWitnessModal: !this.state.showCreateWitnessModal
            });
        };

        const onFilterChange = this.props.onFilterChange;
        const validateAccountHandler = this.props.validateAccountHandler;
        const addWitnessHandler = this.props.addWitnessHandler;
        const removeWitnessHandler = this.props.removeWitnessHandler;

        const {showCreateWitnessModal} = this.state;
        const {
            all_witnesses,
            proxy_witnesses,
            witnesses,
            proxy_account_id,
            hasProxy,
            globalObject,
            filterSearch,
            account
        } = this.props;
        return (
            <div>
                <div className={cnames("content-block")}>
                    <div className="header-selector">
                        <div style={{float: "right"}}>
                            <Button
                                style={{marginRight: "5px"}}
                                onClick={showWitnessModal}
                            >
                                <Translate content="account.votes.join_witnesses" />
                            </Button>
                        </div>

                        <div className="selector inline-block">
                            <Input
                                placeholder={"Filter..."}
                                value={filterSearch}
                                style={{width: "220px"}}
                                onChange={onFilterChange}
                                addonAfter={<AntIcon type="search" />}
                            />
                        </div>
                    </div>
                    <VotingAccountsList
                        type="witness"
                        label="account.votes.add_witness_label"
                        items={all_witnesses}
                        validateAccount={validateAccountHandler}
                        onAddItem={addWitnessHandler}
                        onRemoveItem={removeWitnessHandler}
                        tabIndex={hasProxy ? -1 : 2}
                        supported={hasProxy ? proxy_witnesses : witnesses}
                        withSelector={false}
                        active={globalObject.get("active_witnesses")}
                        proxy={proxy_account_id}
                        filterSearch={filterSearch}
                    />
                </div>
                <JoinWitnessesModal
                    visible={showCreateWitnessModal}
                    account={account}
                    hideModal={showWitnessModal}
                />
            </div>
        );
    }
}
