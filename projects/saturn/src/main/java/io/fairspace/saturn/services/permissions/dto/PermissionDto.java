package io.fairspace.saturn.services.permissions.dto;

import io.fairspace.saturn.services.permissions.Access;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.jena.graph.Node;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private Node user;
    private Access access;
}