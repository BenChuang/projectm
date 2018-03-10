package entity

import java.util.*
import javax.persistence.*

/**
 * 用户类
 */
@Entity
@Table(name = "user")
data class User constructor(@Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int?){
//    constructor(id: Int, username: String, email: String, password: String): this(id){
//        this.username = username
//        this.email = email
//        this.password = password
//    }
    @Column var username: String = ""
    @Column var email: String = ""
    @Column var password: String = ""
}


/**
 * 用户详细信息类
 */
data class UserInfo(val userId: Int) {
    constructor(userId: Int, company: String): this(userId){
        this.company = company
    }
    var company: String = ""
    var department: String = ""
    var gender : Int = 0
        set(value) = if (value in 0..1) field = value else throw IllegalArgumentException("性别类型不合法")
    var age : Int = 0
        set(value) = if (value in 0..200) field = value else throw IllegalArgumentException("年龄数值不合法")
}



