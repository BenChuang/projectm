package utils

import java.util.*

object StringsUtils {
    /**
     * 检测对象toString后是否为空字符
     * @param Object对象
     * @return 空指针或空字符返回true
     */
    fun isNullOrEmpty(obj: Any?):Boolean{
        return obj == null || obj.toString().trim().isEmpty()
    }

    /**
     * 通过反射检测对象的所有getter是否有返回空的情况
     * @param obj 用于检测的对象
     * @return 有任何一个getter为空(null or empty)则返回false，否则返回true
     */
    fun checkGetterNotNullOrEmpty(obj: Any):Boolean{
        val methods = obj.javaClass.declaredMethods
        val methodStream = Arrays.stream(methods)
        return methodStream.noneMatch {
            if (it.name.startsWith("get")) {
                val result = it.invoke(obj)
                if (isNullOrEmpty(result)){
                    return@noneMatch true
                }
            }
            return@noneMatch false
        }
    }
}

