package com.HDD.management.webDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    private String sid;
    private String password;
}
