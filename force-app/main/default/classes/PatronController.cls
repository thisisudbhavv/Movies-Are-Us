public with sharing class PatronController 
{
    @AuraEnabled(cacheable=true)
    public static List<Patron__c> getPatrons(){
        return [SELECT Id, Name
                FROM Patron__c
                WITH SECURITY_ENFORCED];
    }
}