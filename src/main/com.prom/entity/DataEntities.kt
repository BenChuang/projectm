package entity

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.persistence.*

/**
 * 用户类
 */
@Entity
@Table(name = "user")
data class User(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var username: String = "",
        @Column var email: String = "",
        @Column var password: String = ""
){
    constructor():this(null, "", "", "")
}


/**
 * 用户信息类
 */
@Entity
@Table(name = "userinfo")
data class UserInfo(
        @Id var userId: Int? = null,
        @Column var company: String = "",
        @Column var department: String = "",
        @Column var gender : Int = 0,
        @Column var age : Int = 0
){

    constructor():this(null)
}


/**
 * 项目类
 */
@Entity
@Table(name = "project")
data class Project(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var projectOwner: Int? = null,
        @Column var projectName: String = "",
        @Column var projectIntro: String = "",
        @Column var createTime: String = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
){
    constructor(): this(null)
}


/**
 * 任务类
 */
@Entity
@Table(name = "optask")
data class OpTask(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var taskOwner: Int? = null,
        @Column var taskTitle: String = "",
        @Column var taskIntro: String = "",
        @Column var projectAndState: Int? = null,
        @Column var createTime: String = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
        @Column var deadline: String = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
        @Column var taskFor: Int? = null){
    constructor(): this(null)
}


/**
 * 事件类
 */
@Entity
@Table(name = "opevent")
data class OpEvent(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var eventType: Int? = null,
        @Column var userId: Int? = null,
        @Column var dateTime: String = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
){
    constructor(): this(null)
}


/**
 * 项目状态类
 */
@Entity
@Table(name = "project_state")
data class StateToProject(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var projectId: Int? = null,
        @Column var stateName: String = "",
        @Column var preState: Int? = null

){
    constructor(): this(null)
}



/**
 * 参与人员类
 */
@Entity
@Table(name = "project_user")
data class UserToProject(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
        @Column var projectId: Int? = null,
        @Column var userId: Int? = null
){
    constructor(): this(null, null)
}
