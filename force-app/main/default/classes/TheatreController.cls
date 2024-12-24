public with sharing class TheatreController 
{    
    @AuraEnabled(cacheable=true)
    public static List<Theatre__c> getTheatre() {
        return [SELECT Id, Name 
                FROM Theatre__c
                WITH SECURITY_ENFORCED];
    }
}