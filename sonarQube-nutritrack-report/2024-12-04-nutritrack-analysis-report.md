# Code analysis
## nutritrack 
#### Branch main
#### Version not provided 

**By: Administrator**

*Date: 2024-12-04*

## Introduction
This document contains results of the code analysis of nutritrack



## Configuration

- Quality Profiles
    - Names: Sonar way [JavaScript]; 
    - Files: 84178885-100c-4456-ba34-c3f835fe232b.json; 


 - Quality Gate
    - Name: Sonar way
    - File: Sonar way.xml

## Synthesis

### Analysis Status

Reliability | Security | Security Review | Maintainability |
:---:|:---:|:---:|:---:
C | A | E | A |

### Quality gate status

| Quality Gate Status | OK |
|-|-|

Metric|Value
---|---
New Issues|OK


### Metrics

Coverage | Duplications | Comment density | Median number of lines of code per file | Adherence to coding standard |
:---:|:---:|:---:|:---:|:---:
0.0 % | 9.3 % | 16.1 % | 64.5 | 99.8 %

### Tests

Total | Success Rate | Skipped | Errors | Failures |
:---:|:---:|:---:|:---:|:---:
0 | 0 % | 0 | 0 | 0

### Detailed technical debt

Reliability|Security|Maintainability|Total
---|---|---|---
0d 0h 10min|-|0d 2h 20min|0d 2h 30min


### Metrics Range

\ | Cyclomatic Complexity | Cognitive Complexity | Lines of code per file | Coverage | Comment density (%) | Duplication (%)
:---|:---:|:---:|:---:|:---:|:---:|:---:
Min | 0.0 | 0.0 | 12.0 | 0.0 | 2.0 | 0.0
Max | 81.0 | 96.0 | 541.0 | 0.0 | 32.5 | 40.0

### Volume

Language|Number
---|---
JavaScript|1372
Total|1372


## Issues

### Issues count by severity and types

Type / Severity|INFO|MINOR|MAJOR|CRITICAL|BLOCKER
---|---|---|---|---|---
BUG|0|0|1|0|0
VULNERABILITY|0|0|0|0|0
CODE_SMELL|0|2|2|23|0


### Issues List

Name|Description|Type|Severity|Number
---|---|---|---|---
Non-empty statements should change control flow or have at least one side-effect||BUG|MAJOR|1
Variables should be declared with "let" or "const"||CODE_SMELL|CRITICAL|23
Two branches in a conditional structure should not have exactly the same implementation||CODE_SMELL|MAJOR|1
If statements should not be the only statement in else blocks||CODE_SMELL|MAJOR|1
Optional chaining should be preferred||CODE_SMELL|MINOR|2


## Security Hotspots

### Security hotspots count by category and priority

Category / Priority|LOW|MEDIUM|HIGH
---|---|---|---
LDAP Injection|0|0|0
Object Injection|0|0|0
Server-Side Request Forgery (SSRF)|0|0|0
XML External Entity (XXE)|0|0|0
Insecure Configuration|0|0|0
XPath Injection|0|0|0
Authentication|0|0|1
Weak Cryptography|0|0|0
Denial of Service (DoS)|0|0|0
Log Injection|0|0|0
Cross-Site Request Forgery (CSRF)|0|0|0
Open Redirect|0|0|0
Permission|0|0|0
SQL Injection|0|0|0
Encryption of Sensitive Data|0|0|0
Traceability|0|0|0
Buffer Overflow|0|0|0
File Manipulation|0|0|0
Code Injection (RCE)|0|0|0
Cross-Site Scripting (XSS)|0|0|0
Command Injection|0|0|0
Path Traversal Injection|0|0|0
HTTP Response Splitting|0|0|0
Others|0|0|0


### Security hotspots

Category|Name|Priority|Severity|Count
---|---|---|---|---
Authentication|Hard-coded passwords are security-sensitive|HIGH|BLOCKER|1

