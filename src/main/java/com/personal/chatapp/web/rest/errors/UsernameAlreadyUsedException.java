package com.personal.chatapp.web.rest.errors;

import java.io.Serial;

@SuppressWarnings("java:S110") // Inheritance tree of classes should not be too deep
public class UsernameAlreadyUsedException extends BadRequestAlertException {

    @Serial
    private static final long serialVersionUID = 1L;

    public UsernameAlreadyUsedException() {
        super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "Login name already used!", "userManagement", "userexists");
    }
}
