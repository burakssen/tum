import { useNavigate } from 'react-router-dom';

function Impressum(){

    const navigate = useNavigate();


    return (<div className='container'>
        <h1>Impressum</h1>

<h2>Herausgeber</h2>


    <p>
        Technische Universität München<br/>
        Postanschrift: Arcisstr. 21, 80333 München<br/>
        Telefon: 089/289-01<br/>
        Telefax: 089/289-22000<br/>
        poststelle(at)tum.de<br/>
    </p>



<h2>Vertretungsberechtigt</h2>

    <p>
        Die Technische Universität München wird gesetzlich vertreten durch den Präsidenten Prof. Dr. Thomas F. Hofmann.
    </p>

<h2>Umsatzsteueridentifikationsnummer</h2>
    <p>
        DE811193231 (gemäß § 27a Umsatzsteuergesetz)
    </p>

<h2>Verantwortlich für den Inhalt</h2>

    <p>
        Dr.-Ing. Michael Zwick<br/>
        Lehrstuhl für Datenverarbeitung<br/>
        Technische Universität München<br/>
        Arcisstr. 21<br/>
        80333 München<br/>
        Telefon: (089) 289 23609<br/>
        Fax: (089) 289 23600<br/>
        E-Mail: office.ldv(at)xcit.tum.de<br/>
        www.ce.cit.tum.de/ldv/<br/>
    </p>

<h2>Nutzungsbedingungen</h2>
        <p>
            Texte, Bilder, Grafiken sowie die Gestaltung dieser Internetseiten können dem Urheberrecht unterliegen.
            Nicht urheberrechtlich geschützt sind nach § 5 des Urheberrechtsgesetz (UrhG)

            <ul>
                <li>Gesetze, Verordnungen, amtliche Erlasse und Bekanntmachungen sowie Entscheidungen und amtlich verfasste Leitsätze zu Entscheidungen und</li>
                <li>andere amtliche Werke, die im amtlichen Interesse zur allgemeinen Kenntnisnahme veröffentlicht worden sind, mit der Einschränkung, dass die Bestimmungen über Änderungsverbot und Quellenangabe in § 62 Abs. 1 bis 3 und § 63 Abs. 1 und 2 UrhG entsprechend anzuwenden sind.</li>
            </ul>

            Als Privatperson dürfen Sie urheberrechtlich geschütztes Material zum privaten und sonstigen eigenen Gebrauch im Rahmen des § 53 UrhG verwenden. Eine Vervielfältigung oder Verwendung urheberrechtlich geschützten Materials dieser Seiten oder Teilen davon in anderen elektronischen oder gedruckten Publikationen und deren Veröffentlichung ist nur mit unserer Einwilligung gestattet. Diese Einwilligung erteilen auf Anfrage die für den Inhalt Verantwortlichen. Der Nachdruck und die Auswertung von Pressemitteilungen und Reden sind mit Quellenangabe allgemein gestattet.

            Weiterhin können Texte, Bilder, Grafiken und sonstige Dateien ganz oder teilweise dem Urheberrecht Dritter unterliegen. Auch über das Bestehen möglicher Rechte Dritter geben Ihnen die für den Inhalt Verantwortlichen nähere Auskünfte.
        </p>

<h2>Haftungsausschluss</h2>
    <p>
        Alle auf dieser Internetseite bereitgestellten Informationen haben wir nach bestem Wissen und Gewissen erarbeitet und geprüft. Eine Gewähr für die jederzeitige Aktualität, Richtigkeit, Vollständigkeit und Verfügbarkeit der bereit gestellten Informationen können wir allerdings nicht übernehmen. Ein Vertragsverhältnis mit den Nutzern des Internetangebots kommt nicht zustande.

        Wir haften nicht für Schäden, die durch die Nutzung dieses Internetangebots entstehen. Dieser Haftungsausschluss gilt nicht, soweit die Vorschriften des § 839 BGB (Haftung bei Amtspflichtverletzung) einschlägig sind. Für etwaige Schäden, die beim Aufrufen oder Herunterladen von Daten durch Schadsoftware oder der Installation oder Nutzung von Software verursacht werden, übernehmen wir keine Haftung.

        Falls im Einzelfall erforderlich: Der Haftungsausschluss gilt nicht für Informationen, die in den Anwendungsbereich der Europäischen Dienstleistungsrichtlinie (Richtlinie 2006/123/EG – DLRL) fallen. Für diese Informationen wird die Richtigkeit und Aktualität gewährleistet.
    </p>

<h2>Links</h2>
    <p>
        Von unseren eigenen Inhalten sind Querverweise („Links“) auf die Webseiten anderer Anbieter zu unterscheiden. Durch diese Links ermöglichen wir lediglich den Zugang zur Nutzung fremder Inhalte nach § 8 Telemediengesetz. Bei der erstmaligen Verknüpfung mit diesen Internetangeboten haben wir diese fremden Inhalte daraufhin überprüft, ob durch sie eine mögliche zivilrechtliche oder strafrechtliche Verantwortlichkeit ausgelöst wird. Wir können diese fremden Inhalte aber nicht ständig auf Veränderungen überprüfen und daher auch keine Verantwortung dafür übernehmen. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung von Informationen Dritter entstehen, haftet allein der jeweilige Anbieter der Seite.
    </p>
    <button className='btn btn-secondary text-start m-1' onClick={() => {navigate("/home")}}>Abbrechen</button>
    </div>
    );
}

export default Impressum;