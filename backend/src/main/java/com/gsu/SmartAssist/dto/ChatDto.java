/*package com.gsu.SmartAssist.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ChatDto {
    private Long id;
    private String message;
	private String response;	
	private LocalDateTime timestamp;
    private Long version;
	
	// Constructor without toUserRoleComposite for mapping
    public ChatDto(
        Long id,
        String message,
        String response,
        LocalDateTime timestamp,
        Long version
    ) {
        this.id = id;
        this.message = message;
        this.response = response;
        this.timestamp = timestamp;
        this.version = version;
    }
}*/
package com.gsu.SmartAssist.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatDto {
    private Long id;
    private String message;
    private String response;    
    private LocalDateTime timestamp;
    private Long version;
}