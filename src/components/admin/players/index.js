import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firebaseLooper } from '../../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebasePlayers } from '../../../firebase';

class AdminPlayers extends Component {


    state = {
        isloading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot);
            this.setState({
                isloading: false,
                players: players.reverse()
            });
        })
    }


    render() {
        return (
            <AdminLayout>
                <Fragment>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>player</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.players ?
                                    this.state.players.map((player, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link to={`admin_players/add_players/${player.id}`}>
                                                    {player.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`admin_players/add_players/${player.id}`}>
                                                    {player.lastname}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`admin_players/add_players/${player.id}`}>
                                                    {player.number}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`admin_players/add_players/${player.id}`}>
                                                    {player.position}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {
                            this.state.isloading ?
                                <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                                : ''
                        }
                    </div>
                </Fragment>

            </AdminLayout>
        );
    }
}

export default AdminPlayers;