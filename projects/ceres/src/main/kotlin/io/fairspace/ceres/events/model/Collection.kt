package io.fairspace.ceres.events.model

data class Collection(
    val id: Long = 0,
    val type: String = "",
    val location: String = "",
    val name: String = "",
    val description: String? = null,
    val uri: String = "",
    val access: String = "None"
)
