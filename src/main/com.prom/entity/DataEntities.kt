package entity

import java.util.*
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
@Table(name = "user_info")
data class UserInfo(
        @Id var userId: Int? = null
){
    @Column var company: String = ""
    @Column var department: String = ""
    @Column var gender : Int = 0
        set(value) = if (value in 0..1) field = value else throw IllegalArgumentException("性别类型不合法")
    @Column var age : Int = 0
        set(value) = if (value in 0..200) field = value else throw IllegalArgumentException("年龄数值不合法")

    constructor():this(null)
}



