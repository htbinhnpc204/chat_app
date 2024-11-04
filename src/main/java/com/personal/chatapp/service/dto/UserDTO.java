package com.personal.chatapp.service.dto;

import com.personal.chatapp.domain.User;
import java.io.Serial;
import java.io.Serializable;
import lombok.Data;

/**
 * A DTO representing a user, with only the public attributes.
 */
@Data
public class UserDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.username = user.getUsername();
    }
}
