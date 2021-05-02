import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {navLinkStyles} from "./styles";
import {getRoleName} from "../../utils/roles/getRoleName";

class Links extends Component {
    render() {
        const isAdmin = getRoleName(this.props.roleId) === "Администратор"
        const isAccountant = getRoleName(this.props.roleId) === "Бухгалтер"
        const isGeneralAccountant = getRoleName(this.props.roleId) === "Главный бухгалтер"

        const {classes} = this.props

        return (
            <>
                {isAdmin ? (<>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to="/departments" style={navLinkStyles}>
                            Отделы
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to="/employees" style={navLinkStyles}>
                            Сотрудники
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to="/positions" style={navLinkStyles}>
                            Должности
                        </NavLink>
                    </Typography>
                </>) : ""}
                 {isAccountant ? (<>
                     <Typography variant="h6" className={classes.title}>
                         <NavLink to="/employees" style={navLinkStyles}>
                             Сотрудники
                         </NavLink>
                     </Typography>
                     <Typography variant="h6" className={classes.title}>
                         <NavLink to="/salary" style={navLinkStyles}>
                             Расчёт ЗП
                         </NavLink>
                     </Typography>
                     <Typography variant="h6" className={classes.title}>
                         <NavLink to="/taxes" style={navLinkStyles}>
                             Налоги и вычеты
                         </NavLink>
                     </Typography>
                 </>) : ""}
                 {isGeneralAccountant ? (<>
                     <Typography variant="h6" className={classes.title}>
                         <NavLink to="/reports" style={navLinkStyles}>
                             Отчёты
                         </NavLink>
                     </Typography>
                 </>) : ""}
            </>
        )
    }
}

export default Links
